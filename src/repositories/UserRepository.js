const knex = require('../database/knex')

class UserRepository {
    async findByEmail (email) {
        const user = await knex('users').where({email}).first()

        return user
    }

    async create ({ name, email, password }) {
        const [ id ] = await knex('users').insert({ name, email, password: cryptedPassword })

        return {id}
    }

    async getById ({ id }) {
        const user = await knex('users').where({ id }).first()

        return user
    }
}

module.exports = UserRepository