const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../endpoints/users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            /\/ingredients\/*([^\/\n]*)/,
            /\/gobelets\/*([^\/\n]*)/,
            /\/etats\/*([^\/\n]*)/,
            /\/boissons\/*([^\/\n]*)/,
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};