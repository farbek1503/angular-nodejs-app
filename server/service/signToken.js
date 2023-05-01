const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    const accessToken = jwt.sign({
        id
    }, process.env.SECRET_JWT, {
        expiresIn: '30d'
    });
    return accessToken
}

module.exports = generateJWT
