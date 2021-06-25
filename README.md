# openapi20210625
 authorization for microservices.

docker login
docker pull store/softwareag/apigateway-trial:10.7
docker pull store/softwareag/microgateway-trial:10.7  

sysctl -w vm.max_map_count=262144

docker run -d -p 5555:5555 -p 9072:9072 --hostname localhost --name apigw store/softwareag/apigateway-trial:10.7 
