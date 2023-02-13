const knex = require('../database/knex')

const appError = require('../utils/appError')

const { hash, compare } = require('bcryptjs')

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

    async update (request, response) {
        const { name, email, currentPassword, newPassword } = request.body
        const { id } = request.params

        const user = await knex('users').where({ id }).first()

        const userWithEmail = await knex('users').where({ email }).first()
        if (userWithEmail && userWithEmail.id !== user.id) {
            throw new appError("this email it's already in use")
        }

        if (newPassword) {
            if (newPassword && !currentPassword) {
                throw new appError("you must provide your current password if you want it to be updated")
            }
            const passwordCheck = await compare(currentPassword, user.password)
            if (!passwordCheck) {
                throw new appError("the given password it's wrong!")
            }
            user.password = await hash( newPassword, 8 )
        }
        
        user.name = name ? name : user.name
        user.email = email ? email : user.email

        await knex('users').where({ id }).update({ name: user.name, email: user.email, password: user.password})

        return response.json()
    }
}

module.exports = UsersController