var express = require('express');
var app = express()
var request = require('request');
var i = -1;
var fs = require('fs');

app.get('/*', function(req, res) {
    console.log('-- inside load balancer');  
    i = i+1;
	var url = fs.readFileSync('proxy-list.txt').toString().split("\n");
	var total_servers = url.length
	for(var j=0;j < total_servers;j++)
	{
		url[j] = url[j] + "/proxy?key="
	}

	if(i == total_servers-1)
        i=0;
    url[i] = url[i] + req.url;
    //Make request to Proxy-2
    console.log("Making request call to proxy server-"+(i+1))
    request(url[i], function (error, response, body) {
          console.log("---- obtained result from request call to proxy server-"+(i+1))
          res.send(body)
    });
    
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
})

