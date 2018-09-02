var express = require('express');
var app = express()
var request = require('request');
var count = new Array();
var count_total=0;
var fs = require('fs');
var url;

app.get('/*', function(req, res) {
    url = fs.readFileSync('proxy-list.txt').toString().split("\n");
    var total_servers = url.length-1
    for(var j=0;j < total_servers;j++)
    {
        url[j] = url[j] + "/proxy?key="
    }


    console.log('-- inside load balancer'); 
    var min = 0, i;
    for(i=1;i<total_servers;i++)
    {
            if(count[i] < count[min])
                    min = i;
    }
    ++count[min];
    console.log('Number of connections in server '+ (min+1) +' = ' + count[min]);
    url[min] = url[min] + req.url;
    request(url[min], function (error, response, body) {
            console.log("----------- obtained result from request call to proxy server-" + (min+1))
            res.send(body)
            console.log('Number of connections in server' + (min+1) + ' = '+ --count[min]);
    });
})
  
  

app.listen(3000, function(){
  	console.log('App listening on port 3000!')
	var url = fs.readFileSync('proxy-list.txt').toString().split("\n");
	for(var i=0;i<url.length-1;i++)
		count[i] = 0;
})

