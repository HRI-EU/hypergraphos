const jwt = require('jsonwebtoken');
const config = require('../Running_config');

function verifyToken(req, res, next) {
    const token = req.header('Cookie')?.substr(req.header('Cookie').indexOf('=') + 1);
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, config.server.jwtSecretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
