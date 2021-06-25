# openapi20210625
 authorization for microservices.

docker pull consul
docker pull mongo   
docker run --name consul -d -p 9500:8500 consul

docker run -d --name mongo -p  27017:27017 mongo --auth
docker exec -it mongo mongo admin

docker pull swaggerapi/swagger-editor

docker login
docker pull store/softwareag/apigateway-trial:10.7
docker pull store/softwareag/microgateway-trial:10.7  

powershell:
wsl
sysctl -w vm.max_map_count=262144

docker run -d -p 5555:5555 -p 9072:9072 --hostname localhost --name apigw store/softwareag/apigateway-trial:10.7 

http://localhost:5555/
Administrator/manage

http://localhost:5555/WmRoot/top.dsp#
http://localhost:5555/WmAdmin/#/integration/dashboard/overview

