const knex = require('../database/knex')

class TagsRepository {
  async create({ tags, user_id, note_id }) {
    const tagsInfo = tags.map(tag => {
      return {
        name: tag.trim(),
        user_id,
        note_id
      }
    })
    await knex('tags').insert(tagsInfo)
  }

  async getByNoteId({ note_id }) {
    let tags = await knex('tags').where({note_id}).orderBy("name")
    return tags
  }

  async getUserTags({ user_id }) {
    let tags = await knex('tags').where({ user_id }).orderBy("name")
    return tags
  }
}

module.exports = TagRepository