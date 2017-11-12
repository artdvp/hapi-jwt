import Hapi from 'hapi';
import Knex from './knex';
import routes from './routes'

//https://lab-hapi-isphins.c9users.io

const server = new Hapi.Server();

server.connection({
   port: process.env.PORT 
});

server.register(require('hapi-auth-jwt'),(err) => {
    server.auth.strategy('token','jwt', {
        key: 'VRhgsdCvbngiRTybfgMNVcvSsew234mvz8Hjgvn(0544Nbvnsd',
        verifyOptions: {
            algorithms: ['HS256'],
        }
    });
    
    routes.forEach((route) => {
        console.log(`attaching ${route.path}`);
        server.route(route);
    })
});

server.start(err => {
    if (err){
        
        //
        console.error('Error was handled!');
        console.error(err);
    }
    
    console.log(`Server started at ${ process.env.IP }`);
});

