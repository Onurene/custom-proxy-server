var express = require('express');
var mcache = require('memory-cache');
var app = express()
var request = require('request');
//var url='http://www.espncricinfo.com'
var duration = 30;

//Function to check if data exists in cache
var cache = function(key) {
  return mcache.get(key)
}


app.get('/proxy', function(req, res) {
        var key = req.query.key
        //Retrieve data from Cache
        var data = cache(key);

        //Check if data has been retrieved
        if(data)
        {
                //Cache hit
                console.log('cache hit')
                res.status(200).send(data);
        }
        else
        {
                //Cache miss
                console.log('cache miss')
                //Get data from actual website
                request(key, function (error, response, body) {
                    console.log("---- obtained result from actual website")
                    //Write data into cache
                    mcache.put(key, body, duration * 1000);
                    console.log("---- Data written into the cache")
                    //send response to browser
                    res.send(body);
                });

        }
})

app.listen(3003, function(){
  console.log('App listening on port 3003!')
})
