const knex = require("../database/knex")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({email}).first()

    if (!user) throw new appError('wrong email or password', 401)

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) throw new appError('wrong email or password', 401)

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ token, user })
  }
}

module.exports = SessionsController