EasyPost

An example of reading POST data in node.js. 

This example shows how to read POST data from both a form submission, and a REST client. The code example uses a manager method. This helps abstract the extra work of using res.on('data') and res.on('end'). It also provides a single location for maintaing the code that reads POST data, allowing you to enhance it, such as with checks for flooding attacks, etc.

We'll cover reading data from a form submissions and reading data submitted through a REST client (ie., streamed).

Demo @ http://easypost.herokuapp.com
 
Reading POST Data From a Form

    CommonManager.getPostData(req, res, function (data) {
        res.render('index', { txtName: data.txtName });
    });

Reading POST Data From a REST Client

    CommonManager.getPostData(req, res, function (data) {
        data = JSON.parse(data);
        res.render('index', { txtName: data.txtName });
    });

The core manager method for reading the POST data is located in commonManager.js:

CommonManager = {
    getPostData: function (req, res, callback) {
        // Check if this is a form post or a stream post via REST client.
        if (req.readable) {
            // REST post.
            var content = '';

            req.on('data', function (data) {
                if (content.length > 1e6) {
                    // Flood attack or faulty client, nuke request.
                    res.json({ error: 'Request entity too large.' }, 413);
                }

                // Append data.
                content += data;
            });

            req.on('end', function () {
                // Return the posted data.
                callback(content);
            });
        }
        else {
            // Form post.
            callback(req.body);
        }
    }
}

Kory Becker
http://www.primaryobjects.com
