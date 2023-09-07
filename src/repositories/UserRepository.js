const knex = require('../database/knex')

class UserRepository {
    async findByEmail (email) {
        const user = await knex('users').where({email}).first()

        return user
    }

    async create ({ name, email, password }) {
        const [ id ] = await knex('users').insert({ name, email, password })

        return {id}
    }

    async getById ({ id }) {
        const user = await knex('users').where({ id }).first()

        return user
    }

    async update ({ id, user }) {
        const updated = await knex('users').where({ id }).update({ 
            name: user.name, email: user.email, avatar: user.avatar, 
            password: user.password, updated_at: knex.fn.now() 
        }, ['name', 'email'])

        return updated
    }
}

module.exports = UserRepository