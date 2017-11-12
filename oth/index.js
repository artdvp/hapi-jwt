var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    host: process.env.IP,
    port: process.env.PORT
});

server.register(require('vision'), function(err) {

    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.view('index' , {name : 'john'});
        }
    });
    server.route({
        method: 'GET',
        path: '/user/{userName}',
        handler: function(request, reply) {
            var name = encodeURIComponent(request.params.userName);
            reply.view('user' , {name :name });
        }
    });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

/*
server.register(require('inert'),function(err){
    if(err){
        throw err;
    }
    
    
    server.route({
    method: 'GET',
    path: '/',
    handler : function(request,reply){
        reply('<img src="https://source.unsplash.com/category/nature/1600x900" />');
    }
});


server.route({
    method: 'GET',
    path : '/google.png',
    handler : function(request ,reply){
        //reply('TEST hello');
        reply.file('google.png');
    }
});*/

/*server.route({
    method : 'GET',
    path : '/user/{userName}',
    handler : function(request, reply){
        reply('Hello form art code,' + encodeURIComponent(request.params.userName) + '!');
    }
});*/


//});

server.start(function() {
    console.log('Server running at:', server.info.url);
});
