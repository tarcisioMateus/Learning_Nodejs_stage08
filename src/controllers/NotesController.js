const { response } = require('express')
const knex = require('../database/knex')

const appError = require('../utils/appError')

class NotesController {
    async create (request, response) {
        const { title, description, tags, links } = request.body
        const { user_id } = request.params

        const note_id = await knex('notes').insert({ title, description, user_id })

        if (tags) {
            const tagsInfo = tags.split(',').map(tag => {
                return {
                    name: tag.trim(),
                    user_id,
                    note_id
                }
            })
            await knex('tags').insert(tagsInfo)
        }

        if (links) {
            const linksInfo = links.split(',').map(link => {
                return {
                    url: link.trim(),
                    note_id
                }
            })
            await knex('links').insert(linksInfo)
        }

        return response.status(201).json()
    }

    async index (request, response) {
        const { user_id } = request.params

        const userNotes = await knex('notes').select([ 
            "id",
            "title",
            "description"
        ]).where({ user_id }).orderBy("title")

        const userTags = await knex('tags').where({ user_id })

        const notesWithTags = userNotes.map( note => {
            const noteTags = userTags.filter( tag => tag.note_id === note.id ).map( tag => tag.name)
           
            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags)
    }
}

module.exports = NotesController

