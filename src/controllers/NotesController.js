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
        const { user_id, title, tags } = request.query

        let userNotes 
        if (tags) {
            userNotes = await indexSearchWithTags ( tags, user_id, title )
        } else {
            userNotes = await getUserNotes( user_id, title )
        }

        const userTags = await knex('tags').where({ user_id })

        const notesWithTags = getNotesWithTags (userNotes, userTags)

        return response.json(notesWithTags)
    }

    async show (request, response) {
        const { id } = request.params 

        const note = await knex('notes').where({ id }) 

        let tags = await knex('tags').where({note_id: id}).orderBy("name")
        tags = tags.map( tag => tag.name)

        let links = await knex('links').where({note_id: id}).orderBy("created_at")
        links = links.map( link => link.url)

        return response.json({
            ...note,
            tags,
            links
        })
    }

    async delete (request, response) {
        const { id } = request.params

        await knex('notes').where({ id }).delete()

        return response.json()
    }
}

module.exports = NotesController

async function getUserNotes (user_id, title = undefined) {
    let userNotes
    if (title) {
        userNotes = await knex('notes').select([ 
            "id",
            "title"
        ]).where({ user_id }).whereLike("title", `%${title}%`).orderBy("title")
    } else {
        userNotes = await knex('notes').select([ 
            "id",
            "title"
        ]).where({ user_id }).orderBy("title")
    }
    return userNotes
}

async function indexSearchWithTags (tags, user_id, title = undefined) {
    let userNotes
    const mappedTags = tags.split(',').map(tag => tag.trim())

    if (title) {
        userNotes = await knex('tags').select([
            "notes.title",
            "notes.id",
        ]).where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('tags.name', mappedTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy("notes.title")
    } else {
        userNotes = await knex('tags').select([
            "notes.title",
            "notes.id",
        ]).where('notes.user_id', user_id)
        .whereIn('tags.name', mappedTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy("notes.title")
    }
    return userNotes
}

function getNotesWithTags (userNotes, userTags) {
    const notesWithTags = userNotes.map( note => {
        const noteTags = userTags.filter( tag => tag.note_id === note.id ).map( tag => tag.name)
       
        return {
            ...note,
            tags: noteTags
        }
    })
    return notesWithTags
}