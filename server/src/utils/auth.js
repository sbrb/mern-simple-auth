const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req) => {
    let token = req.headers.authorization || '';
    if (token) {
        try {
            token = token.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return { user };
        } catch (e) {
            console.warn('Invalid token');
            return {};
        }
    }
    return {};
};

module.exports = authentication;
