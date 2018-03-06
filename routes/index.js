const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

// var locals = {
//   title: 'An Example',
//   people: [
//       { name: 'Gandalf'},
//       { name: 'Frodo' },
//       { name: 'Hermione'}
//   ]
// };

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

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


router.get('/news', (req, res) => {
  res.send(`    <html>
     <head>
       <title>New</title>
     </head>
     <body>
       <h1>News</h1>
     </body>
    </html>`)
})
module.exports = router;
