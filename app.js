const express = require( 'express' );
const app = express();
const nunjucks = require('nunjucks');

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates

nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    if (err) throw err;
    console.log(output);
});



//middleware goes in the middle
app.use(function (req, res, next) {
  console.log(req.method, req.url, " Status Code: ", res.statusCode);
  // console.log(Object.keys(res));
  next();
  })

    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding


// es5: app.get("/", function(req, res){

// })
app.get('/', (req, res, next) => {
  // res.send(`    <html>
  //    <head>
  //      <title>Twitter</title>
  //    </head>
  //    <body>
  //      <h1>Welcome to Twitter Clone!!</h1>
  //    </body>
  //   </html>`)
  let person = locals.people;
  res.render( 'index', {title: locals.title, people: person} );
})


app.get('/news', (req, res) => {
  res.send(`    <html>
     <head>
       <title>New</title>
     </head>
     <body>
       <h1>News</h1>
     </body>
    </html>`)
})


app.listen(3000, () => {
  console.log(`server listening`);
});
