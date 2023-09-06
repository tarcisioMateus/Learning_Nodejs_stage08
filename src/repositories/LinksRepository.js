const knex = require('../database/knex')

class LinksRepository {
  async create({ links, note_id }) {
    const linksInfo = links.map(link => {
      return {
        url: link.trim(),
        note_id
      }
    })
    const [ links_id ] = await knex('links').insert(linksInfo)
    return links_id
  }

  async getByNoteId({ note_id }) {
    let links = await knex('links').where({note_id}).orderBy("created_at")
    return links
  }
}

module.exports = LinksRepository