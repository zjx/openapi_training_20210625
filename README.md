# openapi20210625
 authorization for microservices.

docker pull consul
docker pull mongo   
docker run --name consul -d -p 9500:8500 consul

docker run -d --name mongo -p  27017:27017 mongo --auth
docker exec -it mongo mongo admin

docker pull swaggerapi/swagger-editor

https://hub.docker.com/_/softwareag-apigateway
https://hub.docker.com/_/softwareag-microgateway-trial/

docker login
docker pull store/softwareag/apigateway-trial:10.7
docker pull store/softwareag/microgateway-trial:10.7  

powershell:
wsl
sysctl -w vm.max_map_count=262144

#sample
docker run -d -p 5555:5555 -p 9072:9072 --hostname localhost --name apigw store/softwareag/apigateway-trial:10.7 
#official
docker run -d -p 5555:5555 -p 9072:9072 --hostname apigw-host --name apigw store/softwareag/apigateway-trial:10.7

# powershell return ``````````
docker run -p 9090:4485 `
--env mcgw_api_gateway_url=http://localhost:5555/rest/apigateway `
--env mcgw_api_gateway_user=Administrator `
--env mcgw_api_gateway_password=manage `
--env mcgw_downloads_apis=EmployeeService `
--name microgateway store/softwareag/microgateway-trial:10.7

apigateway & microgateway official command below:

docker run -d -p 5555:5555 -p 9072:9072 \
--hostname apigw-host \
--name apigw store/softwareag/apigateway-trial:10.7


docker run -p 9090:4485 \
--env mcgw_api_gateway_url=http://sample.com:5555/rest/apigateway \
--env mcgw_api_gateway_user=Administrator \
--env mcgw_api_gateway_password=manage \
--env mcgw_downloads_apis=EmployeeService \
--name microgateway store/softwareag/microgateway-trial:10.7


http://localhost:5555/
Administrator/manage

http://localhost:5555/WmRoot/top.dsp#
http://localhost:5555/WmAdmin/#/integration/dashboard/overview

\\vuenew\VUE

hosts
172.16.20.186 cas.example.org


docker run -d -p 8443:8443 --name cas-management apereo/cas-management:6.3.1                                             
docker cp .\thekeystore cas-management:/etc/cas/thekeystore
docker cp .\management.properties cas-management:/etc/cas/config
docker cp .\users.json cas-management:/etc/cas/config
docker restart cas-management 
https://cas.example.org:8443/cas-management
id:casuser
pwd:Mellon

http://localhost:8080/cas/login


Others:
http://ip-check.info/?lang=en
https://checkip.amazonaws.com
