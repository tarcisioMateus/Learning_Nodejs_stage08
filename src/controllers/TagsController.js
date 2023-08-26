const knex = require('../database/knex')

class TagsController {
    async index (request, response) {
        const user_id = request.user.id

        let tags = await knex('tags').where({ user_id }).orderBy("name")
        tags = tags.map( tag => tag.name )
        tags = tagsOneEntryOnly ( tags )

        return response.json(tags)
    }
}

module.exports = TagsController

function tagsOneEntryOnly ( tags ) {
    let filteredTags = []
    for ( const tag of tags ) {
        if ( !filteredTags.includes(tag) ) {
            filteredTags.push(tag)
        }
    }
    return filteredTags
}