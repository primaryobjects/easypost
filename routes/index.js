var easypost = require('easypost');

exports.index = function(req, res) {
  res.render('index', { txtName: null });
};

exports.post = function (req, res) {
    // Read post data submitted via form.
    easypost.get(req, res, function (data) {
        res.render('index', { txtName: data.txtName });
    });
};

exports.postRest = function (req, res) {
    // Read post data submitted via REST client.
    easypost.get(req, res, function (data) {
        data = JSON.parse(data);
        res.render('index', { txtName: data.txtName });
    });
};