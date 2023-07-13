const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

// middleware to validate token
const checkToken = (req, res, next) => {

    if(!req.headers.authorization) {
        res.status(401).json({message: 'Você não está autenticado'});
        return
    }

    const token = getToken(req);

    if(!token){
        res.status(401).json({message: 'Você não está autenticado'});
        return
    }

    try {

        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({message: 'Token inválido'});
        return
    }
}

module.exports = checkToken;