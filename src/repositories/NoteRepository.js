const knex = require('../database/knex')

class NoteRepository {
  async create({ title, description, user_id }) {
    const [note_id] = await knex('notes').insert({ title, description, user_id })

    return {note_id}
  }

  async getById({ id }) {
    const note = await knex('notes').where({ id }).first()

    return note
  }

  async getUserNotesByTags({ tags, user_id }) {
    const userNotes = await knex('tags').select([
      "notes.title",
      "notes.id",
    ]).where('notes.user_id', user_id)
    .whereIn('tags.name', tags)
    .innerJoin('notes', 'notes.id', 'tags.note_id')
    .orderBy("notes.title")

    return userNotes
  }

  async getUserNotesByTagsAndTitle({ tags, title, user_id }) {
    const userNotes = await knex('tags').select([
      "notes.title",
      "notes.id",
    ]).where('notes.user_id', user_id)
    .whereLike('notes.title', `%${title}%`)
    .whereIn('tags.name', tags)
    .innerJoin('notes', 'notes.id', 'tags.note_id')
    .orderBy("notes.title")

    return userNotes
  }

  async getUserNotesByTitle({ title, user_id }) {
    const userNotes = await knex('notes').select([ 
      "id",
      "title"
    ]).where({ user_id }).whereLike("title", `%${title}%`).orderBy("title")

    return userNotes
  }

  async getUserNotes({ user_id }) {
    const userNotes = await knex('notes').select([ 
      "id",
      "title"
    ]).where({ user_id }).orderBy("title")

    return userNotes
  }

  async removeById({ id }) {
    await knex('notes').where({ id }).delete()
  }
}

module.exports = NoteRepository