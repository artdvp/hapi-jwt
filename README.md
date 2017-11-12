
link [site](https://scotch.io/tutorials/making-a-restful-api-with-hapi-js)

http://api.app.com/birds (GET) - to get a list of all the public birds
http://api.app.com/birds (POST) - to create a new bird
http://api.app.com/birds/:id (GET) - to get a specific bird

install

> npm i --save hapi mysql jsonwebtoken hapi-auth-jwt knex

> npm install --save-dev babel-core babel-preset-es2015

> sudo npm install -g knex

> knex migrate:make Datastructure

> knex migrate:latest

> knex seed:make 01_Users

> knex seed:make 02_Birds

## Start API

JWT Authentication >  JSON Web Token

xxxxx.yyyyy.zzzzz

server.js
