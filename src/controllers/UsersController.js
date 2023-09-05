const knex = require('../database/knex')

const appError = require('../utils/appError')

const { hash, compare } = require('bcryptjs')

const UserRepository = require('../repositories/UserRepository')
const CreateServices = require('../services/user/CreateServices')

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const createServices = new CreateServices(userRepository)
        await createServices.execute({ name, email, password })
        
        return response.status(201).json()
    }

    async update (request, response) {
        const { name, email, currentPassword, newPassword } = request.body
        const user_id = request.user.id

        const user = await knex('users').where({ id: user_id }).first()

        if ( await updateEmailCheck (email, user) ) {
            user.email = email
        }

        if ( await updatePasswordCheck (user, newPassword, currentPassword) ) {
            user.password = await hash( newPassword, 8 )
        }
        
        user.name = name ? name : user.name

        await knex('users').where({ id: user_id }).update({ name: user.name, email: user.email, password: user.password, updated_at: knex.fn.now() })

        return response.json()
    }
}

module.exports = UsersController

async function updateEmailCheck ( email, user) {
    if (email) {
        const userWithEmail = await knex('users').where({ email }).first()
        if (userWithEmail && userWithEmail.id !== user.id) {
            throw new appError("this email it's already in use")
        }
        return true
    }
    return false
}

async function updatePasswordCheck (user, newPassword, currentPassword) {

    if (newPassword) {
        if (newPassword && !currentPassword) {
            throw new appError("you must provide your current password if you want it to be updated")
        }
        const passwordCheck = await compare(currentPassword, user.password)
        if (!passwordCheck) {
            throw new appError("the given password it's wrong!")
        }
        return passwordCheck
    }
    return false
}