(function () {
    "use strict";
    angular.module('TunjiWeb').factory('authService', AuthService);

    AuthService.$inject = ['$location', '$http', '$mdDialog', '$mdToast'];

    function AuthService($location, $http, $mdDialog, $mdToast) {

        var authService = {
            signedInUser: null,
            url: getUrl($location),
            signUp: signUp,
            signIn: signin,
            logout: logout,
            getSession: getSession,
            sendComment: sendComment
        };

        return authService;

        function signUp(newUser) {
            $http.post(authService.url + '/signup', newUser)
                .success(function (createdUser) {
                    if (createdUser._id)
                        authService.signedInUser = createdUser;
                    showToast("Successfully signed up")
                })
                .error(function (data) {
                    console.log(data);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('There was an error signing up')
                            .ok('Okay')
                    );
                });
        }

        function signin(oldUser) {
            $http.post(authService.url + '/signin', oldUser)
                .success(function (oldUser) {
                    authService.signedInUser = oldUser;
                    showToast("Successfully signed in")
                })
                .error(function (data) {
                    var message = data.message || 'There was an error signing in';
                    showErrorDialog(message);
                });
        }

        function logout() {

        }

        function getSession() {
            $http.get(authService.url + '/session')
                .success(function (data) {
                    if (data._id) {
                        authService.signedInUser = data;
                        showToast('Welcome ' + data.username);
                    }
                })
                .error(function (data) {
                    var message = data.message || 'There was an error getting the session';
                    showErrorDialog(message);
                });
        }

        function sendComment(commentBody) {
            $http.post(authService.url + '/contact', commentBody)
                .success(function (data) {
                    showToast(data.message);
                })
                .error(function (data) {
                    var message = data.message || 'There was an error sending the comment';
                    showErrorDialog(message);
                });
        }

        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }

        function showErrorDialog(message) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent(message)
                    .ok('Okay')
            );
        }

        function getUrl(location) {
            var parts = location.absUrl().split('/');
            return parts[0] + '//' + parts[2];
        }
    }
})();