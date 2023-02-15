const knex = requeri('../database/knex')

class TagsController {
    async index (request, response) {
        const { user_id } = request.params

        let tags = await knex('tags').where({ user_id })
        tags = tags.map( tag => tag.name )

        return response.json(tags)
    }
}

module.exports = TagsController