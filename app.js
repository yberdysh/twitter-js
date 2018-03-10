// --save will also save a module to dependenceis package.json file
// var http = require('http');
// var server = http.createServer(function(request, response){
//   console.log('made a request!');
//   response.writeHead(200, { 'Content-Type': 'text/plain'});
//   response.write('here is some plain text');
//   response.end();
// });
// server.listen(1337, function(){
//   console.log('we are listening on 1337');
// });
// this is another simple way to made a server. it will log requests in terminal and that we are listening
// but show nothing in browser
//can also test that we are listening with curl http://localhost:1337/
//curl with -i at the end shows complete response

const express = require( 'express' );
const app = express();
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
//these two lines will help us link up the css
// var mime = require('mime');

var locals = {
  title: 'Some title',
  people: [
  {name: 'Galdalf'},
  {name: 'Hermione'}
  ]
};
// swig.renderFile(__dirname + '/views/index.html', locals, function(err, output){
//   if (err) return console.log(err);
//   console.log(output);
// });
//swig allows you to fuse html with variables, objects, etc
//but res.render does all this without swig

app.set('views', __dirname + '/views'); //where to find the views
app.set('view engine', 'html'); //what file extension do our templates have
app.engine('html', swig.renderFile); //how to render html templates
swig.setDefaults({cache: false});

var logger = morgan('dev');

//static routing middleware:
//every request should be piped into request.static granted I'm keeping my public files in that directory
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: true}));
//for html form submits
//also common to use .json for ajax
app.use(bodyParser.json());


//this line below reroutes all incoming request to the router module
app.use('/', routes) //the '/' is more specific but unneccesary
//because the router express gives you is a middleware function
// const nunjucks = require('nunjucks');

//this is the middleware- before we even make routes, good to do some analysis of
//request and customize them. Also, when not passed '/', root route is automatically assumed
// app.use(function(req, res, next){
//   res.on('finish', function(){
//     console.log(req.method, req.path, res.statusCode);
//     //need the res.on becaause it's only when finished and response received
//     //but it actually works without too...
//   })
//   next();
//   //need to explicitly say you are done with the middleware function and go to next middleware one
//   //otherwise it gets stuck here and you get no response
//   //we need to call next () explicitly in case there's some async functions going on
// });
//this is what prints to the console in terminal

app.use(logger);
//does the above code automatically (logs to console)


//this is what the user sees
app.get('/', function(req, res){
  res.render('index', locals);
  // next();
});

app.get('/news', function(req, res, next){
  res.json({name: 'newsRoute', data: 12345});
  // next();
});

app.use(function(req, res, next){
  console.log('response: ', res.statusCode);
})

app.listen(1337, function(){
  console.log('we are listening on 1337');
});

// app.set('view engine', 'html'); // have res.render work with html files
// app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
// nunjucks.configure('views'); // point nunjucks to the proper directory for templates

// nunjucks.configure('views', {noCache: true});
// nunjucks.render('index.html', locals, function (err, output) {
//     if (err) throw err;
//     console.log(output);
// });



// //middleware goes in the middle
// app.use(function (req, res, next) {
//   console.log(req.method, req.url, " Status Code: ", res.statusCode);
//   // console.log(Object.keys(res));
//   next();
//   })

//     // do your logging here
//     // call `next`, or else your app will be a black hole — receiving requests but never properly responding


// // es5: app.get("/", function(req, res){

// // })



// app.listen(3000, () => {
//   console.log(`server listening`);
// });
