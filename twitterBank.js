//holds tweets and allows us to interact with them
const _ = require('lodash');
const data = [];
//stores tweets

function add (name, content) {
  data.push({ name: name, content: content, id: data.length });
}

function list () {
  return _.cloneDeep(data);
  //clones the object in the array that look similar but are not the
  //same object nor same array
  //we need to return a copy so no one is messing with original array
}

function find (properties) {
  // console.log(properties);
  // console.log(data);r
  return  _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find };
// console.log(data);
// add('Gabriel', 'Hello');
// console.log(data);
// console.log(list());
// console.log(data === list());
// console.log(data[0] === list()[0]);
//shows that not even a single object in the list is the same

const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

add("Harry Potter", "Goblins!!!! Merlin\'s beard!");

console.log(data);
// console.log(find({name :"Harry Potter"}));
// find expects an object as a param


