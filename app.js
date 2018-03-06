const express = require( 'express' );
const app = express();

app.listen(3000, () => {
  console.log(`server listening`);
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
app.get('/', (req, res) => {
  res.send(`    <html>
     <head>
       <title>Twitter</title>
     </head>
     <body>
       <h1>Welcome to Twitter Clone!!</h1>
     </body>
    </html>`)
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
