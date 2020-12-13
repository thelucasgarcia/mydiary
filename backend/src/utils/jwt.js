const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Mydiary';

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && !user) return res.sendStatus(403)
        delete user.iat;
        delete user.password;
        req.user = user;
        next() // pass the execution off to whatever request the client intended
    })
}

function generateAccessToken(user) {
    delete user.password;
    return jwt.sign(JSON.parse(JSON.stringify(user)), SECRET_KEY);
}

module.exports = { authenticateToken, generateAccessToken };