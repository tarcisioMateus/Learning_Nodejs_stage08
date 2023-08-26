const authConfig = require('../configs/auth')
const { verify } = require('jsonwebtoken')
const appError = require('../utils/appError')

function ensureAuthenticated (request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new appError('jwt not informed')
  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id)
    }
    return next()
    
  } catch (error) {
    throw new appError('invalid jwt')
  }
}

module.exports = ensureAuthenticated