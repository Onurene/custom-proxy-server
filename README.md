# Custom-proxy

# Problem Statement :
To build proxy layer for any backend and enable caching.

# Solution :
We build a horizontally scalable proxy layer which is load balanced via a load balancer and this proxy layer is responsible for caching too.

# Implementation Methods :
## Implementation-1 . Using nginx
→  It’s a web server that can work both as a load balancer and HTTP cache. It uses round robin as a default method for load balancing.

## Implementation-2 . Independent caching of each proxy server load balanced by round robin method.
→ The load balancer processes the requests to the proxy servers according to round robin method . Each proxy has its own independent cache so the data from the request is shared amongst the caches of these proxy servers.

## Implementation-3 . Alternative method for implementation 2. 
→ An improvement to increase cache memory efficiency and time taken to complete request is that we store the URL and the proxy server number which completes the request for that URL in the load balancer.

→ Hence when we encounter the same URL request, we search for the proxy server number in the cache of the load balancer server and send the request to the same proxy server.

→ If the difference of number of connections between the proxy servers is more or the URL is being requested for the first time after previous expiry of cache, then we use the ‘least connection method’ to process the request.

## Implementation-4 . Common cache for all the proxy servers load balanced by round robin method.
→ This method uses common cache for all the proxy servers. Load balancing is done using Round Robin method. The first request to the website encounters a cache miss and data is retrieved from the actual website. On subsequent requests to the same url, it is first searched in the cache, if found, it’s returned from the cache else retrieved from the actual website and stored in the cache.

## Implementation-5 . Common cache for all the proxy servers load balanced by least number of connections in the proxies.
→When a request is made to the website the load balancer checks for the proxy server that has served the least number of connections and request is sent via that proxy server.

## Independent cache

![alt text](https://raw.githubusercontent.com/vkdhanaraj/Custom-proxy/master/images/independent_cache.png)

## Common cache

![alt text](https://raw.githubusercontent.com/vkdhanaraj/Custom-proxy/master/images/common_cache.png)
