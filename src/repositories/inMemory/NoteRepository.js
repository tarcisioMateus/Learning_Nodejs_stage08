class NoteRepository {
  notes = []
  tags = []

  async create({ title, description, user_id }) {
    const note = {
      id: generateAvalibleId( this.notes ),
      title, description, user_id
    }
    this.notes.push(note)
    return note
  }

  async getById({ id }) {
    const note = this.notes.find( note => note.id === id )

    return note
  }

  async getUserNotesByTags({ tags, user_id }) {
    const userNotes = this.notes.filter( note => {
      if (note.user_id === user_id) {
        const noteTags = this.tags.filter( tag => tag.note_id === note.id)
        for ( const tag of noteTags ) {
          if ( tags.includes(tag.name) ) return true
        }
      }
      return false
    })

    return userNotes
  }

  async getUserNotesByTagsAndTitle({ tags, title, user_id }) {
    const userNotes = this.notes.filter( note => {
      if (note.user_id === user_id) {
        if ( note.title.includes(title) ) {
          const noteTags = this.tags.filter( tag => tag.note_id === note.id)
          for ( const tag of noteTags ) {
            if ( tags.includes(tag.name) ) return true
          }
        }
      }
      return false
    })

    return userNotes
  }

  async getUserNotesByTitle({ title, user_id }) {
    const userNotes = this.notes.filter( note => {
      if (note.user_id === user_id) {
        if ( note.title.includes(title) ) {
          return true
        }
      }
      return false
    })

    return userNotes
  }

  async getUserNotes({ user_id }) {
    const userNotes = this.notes.filter( note => note.user_id === user_id)

    return userNotes
  }

  async removeById({ id }) {
    const index = this.notes.findIndex( note => note.id === id )
    this.notes[ index ] = {}
  }
}

module.exports = NoteRepository

function generateAvalibleId( notes ) {
  if ( notes.length === 0) return 1

  const lastElement = notes.slice(-1)
  return (lastElement.id + 1)
}