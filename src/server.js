import Hapi from 'hapi';
import Knex from './knex';

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
});

server.start(err => {
    if (err){
        
        //
        console.error('Error was handled!');
        console.error(err);
    }
    
    console.log(`Server started at ${ process.env.IP }`);
});


// route

server.route({
    path: '/birds',
    method: 'GET',
    handler: (request , reply) => {
        const getOption = Knex('birds').where({
            isPublic: true
        }).select('name','species','picture_url').then((result) => {
            if(!result || result.length === 0){
                reply({
                    error: true,
                    errMessage: 'no public bird found',
                });
            }
            reply({
                dataCount: result.length,
                data: result,
            });
        }).catch((err) => {
            console.log(err);
            reply('server-side error');
            
        });
    }
});

// --- POST route

server.route({
   path: '/auth',
   method: 'POST',
   handler: (request , reply ) => {
       
       // This is a ES6 standard
       const { username, password } = request.payload;
       
       const getOperation = Knex('users').where({
           username,
       }).select('guid','password').then(([user]) => {
           if(!user){
               reply({
                   error: true,
                   errMessage: 'the specified user was not found'
               });
               return;
           }
           if( user.password === password){
               const token = jwt.sign({
                   username,
                   scope: user.guid,
               }, 'VRhgsdCvbngiRTybfgMNVcvSsew234mvz8Hjgvn(0544Nbvnsd', {
                   algorithm: 'HS256',
                   expiresIn: '1h',
               });
               reply({
                   token,
                   scope: user.guid,
               })
           } else {
               reply('incorrect password');
           }
       }).catch((err) => {
           console.log(err);
           reply('server-side error');
       });
   }
});


// routes birds

server.route({
    path: '/birds',
    method: 'POST',
    config: {
        auth: {
            strategy: 'token'
        }
    },
    handler: (request , reply) => {
        const { bird } = request.payload;
    }
})
