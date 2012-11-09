var managers = require('../managers/commonManager');

exports.index = function(req, res) {
  res.render('index', { txtName: null });
};

exports.post = function (req, res) {
    // Read post data submitted via form.
    CommonManager.getPostData(req, res, function (data) {
        res.render('index', { txtName: data.txtName });
    });
};

exports.postRest = function (req, res) {
    // Read post data submitted via REST client.
    CommonManager.getPostData(req, res, function (data) {
        data = JSON.parse(data);
        res.render('index', { txtName: data.txtName });
    });
};