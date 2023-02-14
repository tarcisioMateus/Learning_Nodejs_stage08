const knex = require('../database/knex')

const appError = require('../utils/appError')

class NotesController {
    async create (request, response) {
        const { title, description, tags, links } = request.body
        const { user_id } = request.params

        const note_id = await knex('notes').insert({ title, description, user_id })


        const tagsInfo = tags.split(',').map(tag => {
            return {
                name: tag.trim(),
                user_id,
                note_id
            }
        })
        await knex('tags').insert(tagsInfo)

        const linksInfo = links.split(',').map(link => {
            return {
                url: link.trim(),
                note_id
            }
        })
        await knex('links').insert(linksInfo)

        return response.status(201).json()
    }
}

module.exports = NotesController