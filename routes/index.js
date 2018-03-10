const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
//this function returns a new router instance
const tweetBank = require('../twitterBank');

router.get('/', function(req, res, next){
  var alltweets = tweetBank.list();
  res.render('index', {title: 'Tweets', tweets: alltweets, showForm: true});
})

router.get('/users/:name', function(req, res, next){
  var tweetsForName = tweetBank.find({ name: req.params.name});
  //req.params.actualnameofparam makes this available to use from locals
  //make sure name matches line 12

  res.render('index', {title: "Twitter", tweets: tweetsForName, showForm: true, name: req.params.name});
})

router.get('/tweets/:id', function(req, res, next){
  var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id)});
  //can also do +req.params.id to coerce into a number
  res.render('index', {title: 'Twitter.js', tweets: tweetsWithThatId});
})

router.post('/tweets', function(req, res, next){
  tweetBank.add(req.body.name, req.body.text);
  //we are parsing the body
  res.redirect('/');
  //we need to give a response so we redirect back to all tweets
})
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendFile('/stylesheets/style.css', { root: __dirname + '../public'})
// })
//this is static routing, but there's a better way than just hardcoding it

//next tends not to be necessary but good reminder it's an available param

// router.get('/', function (req, res) {
//   let tweets = tweetBank.list();
//   res.render( 'index', { tweets: tweets } );
// });

// app.get('/', (req, res, next) => {
//   // res.send(`    <html>
//   //    <head>
//   //      <title>Twitter</title>
//   //    </head>
//   //    <body>
//   //      <h1>Welcome to Twitter Clone!!</h1>
//   //    </body>
//   //   </html>`)
//   let person = locals.people;
//   res.render( 'index', {title: locals.title, people: person} );
// })


// router.get('/news', (req, res) => {
//   res.send(`    <html>
//      <head>
//        <title>New</title>
//      </head>
//      <body>
//        <h1>News</h1>
//      </body>
//     </html>`)
// })
module.exports = router
//by exporting this router, whatever custom behavior we define for this router can
//then be used by the main file app.js
