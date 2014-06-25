var name = require('./naming');
var fs = require('fs');

exports.upload = function(req, res) {
    /*var review = {
        file: req.files.thumbnail,
    }*/
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var returnObj = {
        metaSetup: {
            author: "www.nomis.dk - sp90(github)",
            title: "Boilerplate",
            pagetitle: "index",
            description: "This is a basic boilerplate which imply the best practice in frontend and a nodeJS express server",
            pageurl: fullUrl,
            imgurl: "imgurl"
        },
        content: {
            title: "First reveiw",
            thumbnail: "http://media-cache-ec0.pinimg.com/736x/73/a4/2e/73a42e19698eee5014186f73b1130f83.jpg",
            content: "Here is a long review of this food",
            rating: 8
        }
    };
    //var files = req.files;
    console.log(req.files);
    for (var i = 0; i < req.files.length; i++) {
        var file = req.files[i];
        console.log("file vvvvv "); 
        console.log(file);
    };
    res.render("index", returnObj);
    /*var tmp_path = review.file.path;
    var target_path = './public/images/media/' + name.give() + "_" + review.file.name;

    fs.stat(target_path, function(err, stat) {
        if (err == null) {
            var newName = './public/images/media/' + name.give() + "_" + review.file.name;
            fs.rename(tmp_path, newName, function(err) {
                if (err) throw err;
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                    console.log('File uploaded to: ' + newName + ' - ' + review.file.size + ' bytes');
                    var nnLength = newName.length - 1;
                    var substredName = newName.substr(7, nnLength);
                    console.log(substredName);
                    var insetReview = {
                        header: req.body.header,
                        content: req.body.content,
                        file: substredName,
                        rating: req.body.rating
                    }
                    db.insert(insetReview, function(err, newDoc) { // Callback is optional
                        console.log(newDoc);
                    });
                    db.find({}, function(err, docs) {
                        res.render('index', {
                            header: 'FirstNEDB',
                            posts: docs
                        });
                    });
                });
            });
        } else if (err.code == 'ENOENT') {
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                    console.log('File uploaded to: ' + target_path + ' - ' + review.file.size + ' bytes');
                    var pathLength = target_path.length - 1;
                    var substredName = target_path.substr(7, pathLength);
                    console.log(substredName);
                    var insetReview = {
                        header: req.body.header,
                        content: req.body.content,
                        file: substredName,
                        rating: req.body.rating
                    }
                    db.insert(insetReview, function(err, newDoc) { // Callback is optional
                        console.log(newDoc);
                    });
                    db.find({}, function(err, docs) {
                        res.render('index', {
                            header: 'FirstNEDB',
                            posts: docs
                        });
                    });
                });
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });*/
};