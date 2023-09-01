

## Installation and startup
On the root folder, you can run the application by 

```bash
$ docker-compose up 
```

## Test
To test the application, you have to say the microservice container and the run docker exec, just like this: 

```bash
# users microservice for example
$ docker exec -it users-microservice bash;
$ yarn test;
# after the test's run, you can exit by entering 'exit'
$ exit;
```
for orders microservice is the same process, "orders-microservice"
but for api_gateway, is a little different it's : "backend_gateway",
and as the api_gateway is just a form to centralize the requests, 
it doesn't have the users and orders tests, as those are already tested
on each of them respectively.



## Ports and documentation
There are 3 microservices in this repo: users, orders, api_gateway;<br/>

users microservice runs on port 3010 <br/>
orders microservice runs on port 3020 <br/>
api_gateway microservice runs on port 3030 <br/>

To access the swagger ui of each of them, you just have to 
access the url "localhost:microservice_port/api"
