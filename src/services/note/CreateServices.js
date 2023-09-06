const appError = require('../utils/appError')

class CreateServices {
  constructor({ noteRepository, tagsRepository, linksRepository }) {
    this.noteRepository = noteRepository
    this.tagsRepository = tagsRepository
    this.linksRepository = linksRepository
  }

  async execute({ title, description, tags, links, user_id }) {
    inputValidation (title, description, tags, links)

    const note = await this.noteRepository.create({ title, description, user_id }) 

    if (tags.length > 0) {
      await this.tagsRepository.create({ tags, user_id, note_id: note.id })
    }

    if (links.length > 0) {
      await this.linksRepository.create({ links, note_id: note.id })
    }
    return note
  }
}

module.exports = CreateServices

function inputValidation (title, description, tags, links) {
  if (!title) {
    throw new appError("You can't created a new note without a title.")
  }
  if (!description && !links.length) {
    throw new appError("it's pointless creating a note with no description nor links")
  }
  if (!tags.length) {
    throw new appError("please add some tag, to help you organize your notes")
  }
}