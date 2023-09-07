const knex = require('../database/knex')

const appError = require('../utils/appError')

class NotesController {
    async create (request, response) {
        const { title, description, tags, links } = request.body
        const user_id = request.user.id

        

        return response.status(201).json()
    }

    async index (request, response) {
        const { title, tags } = request.query
        const user_id = request.user.id



        return response.json(notesWithTags)
    }

    async show (request, response) {
        const { id } = request.params 



        return response.json({
            ...note,
            tags,
            links
        })
    }

    async delete (request, response) {
        const { id } = request.params

        await knex('notes').where({ id }).delete()

        return response.json()
    }
}

module.exports = NotesController




