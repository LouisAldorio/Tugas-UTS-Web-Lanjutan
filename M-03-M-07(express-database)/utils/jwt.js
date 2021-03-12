const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../api/config/db.config')

module.exports.GenerateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
    }, JWT_SECRET, { expiresIn: '7d' })
} 