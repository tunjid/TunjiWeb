"use strict";

const TEAM_CHAT_NAMESPACE = '/team-chat';

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const JOIN_ROOM = 'join';
const NEW_MESSAGE = 'newMessage';
const ERROR = 'error';

const session = require('./session');
const logger = require('./logger');
const config = require('./config');

const Mongoose = require('mongoose');
const SharedSession = require("express-socket.io-session");

const ioSession = SharedSession(session, {
    autoSave: true
});

const User = require('mongoose').model('User');

function getSession(socket) {
    return socket.handshake.session;
}

function getUserId(socket) {
    return getSession(socket).passport.user;
}

function logError(socket, message) {
    logger.log("Join socket error", message);
    socket.emit(ERROR, {message: message});
}

function isLoggedIn(socket) {
    const session = getSession(socket);
    return !!session && !!session.passport;
}

module.exports = function (server) {
    const io = require('socket.io')(server);
    io.use(ioSession);

    ioEvents(io);
};

function ioEvents(io) {
    const teamChatNamespace = io.of(TEAM_CHAT_NAMESPACE);

    teamChatNamespace.use(ioSession);
    teamChatNamespace.on(CONNECTION, (socket) => {

        socket.on(JOIN_ROOM, (user) => {
            const userId = user._id;

            User.findById(userId, function (err, foundUser) {
                if (err || !foundUser)  return logError(socket, err ? err : 'User doesn\'t exist.');
                if (!isLoggedIn(socket)) return;

                const session = getSession(socket);
                if (!session.deviceSession) session.deviceSession = {};
                session.deviceSession[userId] = {user: foundUser};

                session.save(() => {
                    socket.join(userId);
                    socket.broadcast.to(userId).emit(JOIN_ROOM, user.toJSON());
                });
            });
        });

        // When a socket exits
        socket.on(DISCONNECT, function () {
            if (!isLoggedIn(socket)) return;
            socket.broadcast.emit('removeUser', 'left');
        });

        // When a new message arrives
        socket.on(NEW_MESSAGE, function (payload, acknowledgement) {
            if (!isLoggedIn(socket)) return;

            const session = getSession(socket);
            if (!session.deviceSession) return;

            const deviceSession = session.deviceSession[payload.team];
            if (!deviceSession) return;

            const role = deviceSession.role;
            const team = deviceSession.team;
            if (!role || !team) return;

            new TeamChat(payload).save((saveError, savedChat) => {
                if (saveError) return logger.log('Chat error: ', saveError);

                const returnedChat = savedChat.toJSON();
                returnedChat.user = role.user;
                returnedChat.team = team;
                returnedChat.__v = '';
                if (!returnedChat.user.imageUrl) returnedChat.user.imageUrl = role.imageUrl;

                acknowledgement(returnedChat);
                socket.broadcast.to(team._id).emit(NEW_MESSAGE, returnedChat);

                const feedItem = FeedController.getFeedItem(
                    schemaProps.TEAM_CHAT.schemaName,
                    '{name} • {team}'.formatUnicorn({name: role.user.fullName, team: team.name}),
                    savedChat.content,
                    savedChat
                );

                const query = {_id: {$ne: role._id}, team: team};
                Notifier.notifyTeamMembers(query, feedItem);
            })
        });

        socket.on(ERROR, function () {
            logger.log(arguments);
        });
    });
}