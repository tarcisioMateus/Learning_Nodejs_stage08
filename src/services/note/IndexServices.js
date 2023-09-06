const appError = require('../../utils/appError')

class IndexServices {
  constructor({ noteRepository, tagsRepository }) {
    this.noteRepository = noteRepository
    this.tagsRepository = tagsRepository
  }

  async execute({ title, tags, user_id }) {
    
    let userNotes 
    if (tags) {
        userNotes = await searchWithTags ({ tags, user_id, title, noteRepository: this.noteRepository })
    } else {
        userNotes = await getUserNotes({ user_id, title, noteRepository: this.noteRepository })
    }

    const userTags = await this.tagsRepository.getUserTags({ user_id })

    const notesWithTags = getNotesWithTags (userNotes, userTags)

    return notesWithTags
  }
}

module.exports = IndexServices


async function getUserNotes ({ user_id, noteRepository, title = undefined }) {
  let userNotes
  if (title) {
    userNotes = await noteRepository.getUserNotesByTitle({ title, user_id })
  } else {
    userNotes = await noteRepository.getUserNotes({ user_id })
  }
  return userNotes
}

async function searchWithTags ({ tags, user_id, noteRepository,  title = undefined }) {
  let userNotes
  const mappedTags = tags.split(',').map(tag => tag.trim())

  if (title) {
    userNotes = await noteRepository.getUserNotesByTagsAndTitle({ tags, title, user_id })
  } else {
    userNotes = await noteRepository.getUserNotesByTags({ tags, user_id })
  }
  userNotes = notesOneEntryOnly( userNotes )
  return userNotes
}

function notesOneEntryOnly ( notes ) {
  let filteredNotes = []
  for ( const note of notes ) {
    if (filteredNotes.filter(fN => fN.id == note.id).length) {
      continue
    }
    filteredNotes.push(note)
  }
  return filteredNotes
}

function getNotesWithTags (userNotes, userTags) {
  const notesWithTags = userNotes.map( note => {
      const noteTags = userTags.filter( tag => tag.note_id === note.id )
     
      return {
          ...note,
          tags: noteTags
      }
  })
  return notesWithTags
}