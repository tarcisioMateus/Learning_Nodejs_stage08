const { randomUUID } = require('crypto')

class TagsRepository {
  tags = []

  async create({ tags, user_id, note_id }) {
    for (const tag of tags) {
      const newEntry = {
        id: randomUUID(),
        name: tag.trim(),
        user_id,
        note_id
      }
      this.tags.push( newEntry )
    }
  }

  async getByNoteId({ note_id }) {
    let tags = this.tags.filter( tag => tag.note_id === note_id)
    return tags
  }

  async getUserTags({ user_id }) {
    let tags = this.tags.filter( tag => tag.user_id === user_id)
    return tags
  }
}

module.exports = TagsRepository
