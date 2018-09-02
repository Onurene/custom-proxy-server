#install docker in your system and run the following commands

#To Run all containers of a particular implementation at once 

	#implementation-2
	sh 2-implementation.sh

	#implementation-3
	sh 3-implementation.sh

	#implementation-4
	sh 4-implementation.sh

	#implementation-5
	sh 5-implementation.sh

#To kill and remove containers
	sh kill.sh


#To view outputs, Run each of the below commands in different terminals (or terminator)
	docker logs loadbalancer -f
	docker logs backend -f
	docker logs cache -f
	docker logs proxy-1 -f
	docker logs proxy-2 -f
	docker logs proxy-3 -f

