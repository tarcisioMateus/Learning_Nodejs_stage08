const TagsRepository = require('../repositories/TagsRepository')

const IndexServices = require('../services/tags/IndexServices')

class TagsController {

    async index (request, response) {
        const user_id = request.user.id

        const indexServices = new IndexServices({
            tagsRepository: new TagsRepository()
        })
        const tags = await indexServices.execute({ user_id })

        return response.json(tags)
    }
}

module.exports = TagsController

