docker run -d --net host -p 3010:3010 --name backend vkdhanaraj/ccbd_backend:latest /bin/bash -c "cd /ccbd_project && node backend.js"

docker run -d --net host -p 4010:4010 --name cache vkdhanaraj/ccbd_cache:latest /bin/bash -c "cd /ccbd_project && node cache.js"

docker run -d --net host -p 3000:3000 --name loadbalancer vkdhanaraj/ccbd_loadbalancer:latest /bin/bash -c "cd /ccbd_project/implementation-2 && node loadbalancer.js"

docker run -d --net host -p 3001:3001 --name proxy-1 vkdhanaraj/ccbd_proxy:latest /bin/bash -c "cd /ccbd_project/implementation-2 && node proxy-1.js"

docker run -d --net host -p 3002:3002 --name proxy-2 vkdhanaraj/ccbd_proxy:latest /bin/bash -c "cd /ccbd_project/implementation-2 && node proxy-2.js"

docker run -d --net host -p 3003:3003 --name proxy-3 vkdhanaraj/ccbd_proxy:latest /bin/bash -c "cd /ccbd_project/implementation-2 && node proxy-3.js"
