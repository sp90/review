var express = require('express');
var connect = require('connect');
var http = require('http');
var bodyParser = require('body-parser');
var gzip = require('connect-gzip');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var app = express();

var hbs = require('express-hbs');
var Datastore = require('nedb'), 
	db = new Datastore({ filename: 'db/mydb.db', autoload: true });

app.engine('hbs', hbs.express3({
  	partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layout.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'));
gzip.staticGzip(__dirname + '/public', { maxAge: 86400000 }); //86400000ms = 1 day
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride());


app.get('/', function(req, res){
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
  	res.render("index", returnObj);
}); 

//var media = require(__dirname + '/fileupload/media');
//app.post('/upload/media', multipartMiddleware, media.upload);


app.listen(3000, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("server started on localhost:3000");
	}	
});