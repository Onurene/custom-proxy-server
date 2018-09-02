var express = require('express');
var app = express()
var mcache=require('memory-cache');
var request = require('request');
var count = Array();
var fs = require('fs');
var total_server;
var diff;
var duration=30;
var thresh=10;
var url;

var cache = function(key) {
  return mcache.get(key)
}

app.get('/*', function(req, res) {
	 var flag = 0;
     url = fs.readFileSync('proxy-list.txt').toString().split("\n");
        console.log('-- inside load balancer'); 
		total_server = url.length-1;
		for(var k=0;k<total_server-1;k++)
		{
			for(var i=k+1;i<total_server;i++)
			{
				diff = Math.abs(count[i]-count[k]);
				if(diff>thresh){
					least_conn(req,res);
					flag = 1;
					break;
				}
			}
			if(flag == 1)
				break;
		}
		if(x = cache(req.url)){  //Check if Url is present in cache
	        var serverno=mcache.get(req.url);
	        serverno = serverno-1;
	        url[serverno] = url[serverno] + "/proxy?key=" + req.url;
            console.log("..................................Request repeated and its result can be found in servernumber:"+(serverno+1))
		    ++count[serverno];

    	    console.log("Making call to server "+(serverno+1))
		    console.log('Number of connections in server '+ (serverno+1) +' = ' + count[serverno]);
		    request(url[serverno], function (error, response, body) {
		            console.log("----------- obtained result from request call to server " + (serverno+1))
		            mcache.put(req.url,serverno+1,duration*1000)
		            res.send(body)
		            console.log('Number of connections in server' + (serverno+1) + ' = '+ --count[serverno]);
		    });
        }
		else
		{
				least_conn(req,res);
		}
});
 
var least_conn =function(req,res){
		var min = 0
		var i;
		url = fs.readFileSync('proxy-list.txt').toString().split("\n");
		for(i=1;i<total_server;i++)
        {
                if(count[i] < count[min])
                        min = i;
        }
        
        console.log("New request")
        ++count[min];
        console.log("Making call to server "+(min+1))
        console.log('Number of connections in server '+ (min+1) +' = ' + count[min]);
        url[min] = url[min] + "/proxy?key=" + req.url;
        request(url[min], function (error, response, body) {
                console.log("----------- obtained result from request call to server " + (min+1))
                mcache.put(req.url,(min+1),duration*1000)
                res.send(body)
                console.log('Number of connections in server' + (min+1) + ' = '+ --count[min]);
        });
        
}

app.listen(3000, function(){
	console.log('App listening on port 3000!')
	url = fs.readFileSync('proxy-list.txt').toString().split("\n");
	for(var j=0;j<url.length-1;j++)
		count[j]=0;

})
