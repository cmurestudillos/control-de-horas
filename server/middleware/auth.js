const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRETA);
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no válido.'});
    }
}
