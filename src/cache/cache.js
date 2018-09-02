'use strict'

var express = require('express'),bodyParser = require('body-parser');
var app = express();
var mcache = require('memory-cache');
var url='http://www.espncricinfo.com'
var duration = 30;

app.use(bodyParser.json({limit: '50mb'}));

//To write data into the cache
app.post('/cache_post', function(req,res){

        console.log('trying to create new cache entry');
        var key = req.query.key;
        var value = req.body.key;
//        console.log('key inside post :' + key)
//        console.log('value inside post :')
//        console.log(value);
        mcache.put(key, value, duration * 1000);
        res.send('inside post')
})

//To read data from the cache
app.get(('/cache_get'), function(req,res){
        console.log('trying to get cache data');
//        console.log('key : '+ req.query.key);
        var data = mcache.get(req.query.key)
        res.send(data)
});

app.use(function(req, res) {
        res.status(404).send('') //not found
})

app.listen(4010, function () {
        console.log(`App listening on port 4010`)
})
