const appError = require('../../utils/appError')

class ShowServices {
  constructor({ noteRepository, tagsRepository, linksRepository }) {
    this.noteRepository = noteRepository
    this.tagsRepository = tagsRepository
    this.linksRepository = linksRepository
  }

  async execute({ id }) {
    const note = await this.noteRepository.getById({ id })

    const tags = await this.tagsRepository.getByNoteId({ note_id: id })

    const links = await this.linksRepository.getByNoteId({ note_id: id })

    return {
      ...note,
      tags,
      links
    }
  }
}

module.exports = ShowServices