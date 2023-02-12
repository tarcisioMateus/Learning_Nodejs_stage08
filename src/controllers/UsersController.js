const knex = require('../database/knex')

const appError = require('../utils/appError')

const { hash } = require('bcryptjs')

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body

        const userWithEmail = await knex('users').where({email}).first()

        if (userWithEmail) {
            throw new appError("This email it's already in use")
        }

        const cryptedPassword = await hash(password, 8)

        await knex('users').insert({ name, email, password: cryptedPassword })

        return response.status(201).json()
    }
}

module.exports = UsersController