/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

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
