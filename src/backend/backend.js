var express = require('express');
var app = express()
var request = require('request');
var i = 0;

app.get('/backend', function(req, res) {
  console.log('-- inside backend');
  res.send('Hello!! Welcome to my page!!!\n' + i)
  
})

app.listen(3010, function(){
  console.log('App listening on port 3010!')
  setInterval(() => {
    i = i+1;
    if(i == 10000)
      i = 0;
  },2000);

})
