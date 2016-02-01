
/* GET Angular home page. */

module.exports = function(app) {
    app.route('/*').get(angularRouter);

    function angularRouter (req, res) {
        console.log(req.params);
        res.render('index', {title: 'Adetunji Dahunsi'});
    }
};
