const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(403).send('A token is required for authorization')
        return next()
    }

    const user = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = user.id;
    return next()
}

module.exports = verifyToken
