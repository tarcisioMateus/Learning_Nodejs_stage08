class LinksRepository {
  links = []

  async create({ links, user_id, note_id }) {
    for (const link of links) {
      const newEntry = {
        id: generateAvalibleId( this.links ),
        url: link.trim(),
        note_id
      }
      this.links.push( newEntry )
    }
  }

  async getByNoteId({ note_id }) {
    let links = this.links.filter( link => link.note_id === note_id)
    return links
  }
}

module.exports = LinksRepository

function generateAvalibleId( links ) {
  if ( links.length === 0) return 1

  const lastElement = links.slice(-1)
  return (lastElement.id + 1)
}