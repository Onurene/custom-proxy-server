var express = require('express');
var mcache = require('memory-cache');
var app = express()
var request = require('request');
var url='http://www.espncricinfo.com'
var duration = 30;

//Function to check if data exists in cache
var cache = function(key) {
  return mcache.get(key)
}

app.get('/proxy', function(req, res) {
        var key = req.query.key
        var cache_url = 'http://localhost:4010/cache_get?key='+key
        request.get(cache_url, function (error, response, body) {
                if(error)
                { 
                        console.log('error:', error); // Print the error if one occurred
                }
         //       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received  

                if(body && response.statusCode ==200)
                {
                        //Cache hit
                        console.log('cache hit')
                        res.status(200).send(body);     //Send data
                }
                else
                {
                        //Cache miss
                        console.log('cache miss')
                        //Get data from actual website
                        request(key, function (error, response, body) {
                                console.log("---- obtained result from www.espncricinfo.com")
                                //Make call to write data into the cache
                                    request.post({ 
                                                headers : {'content-type' : 'application/json'},
                                                url : 'http://localhost:4010/cache_post?key='+key, 
                                                json : {key : body}
                                                },  function(error, response,body){
                                                        console.log('Returned after writing into cache')
                                                        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received        
                                                        if(error)       
                                                        {
                                                              console.log('post error : '+error)
                                                        }
                                                    })
                                res.send(body);                
                        });

                }
        });
})

app.listen(3003, function(){
console.log('App listening on port 3003!')
})
