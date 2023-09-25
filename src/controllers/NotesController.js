const NoteRepository = require('../repositories/NoteRepository')
const TagsRepository = require('../repositories/TagsRepository')
const LinksRepository = require('../repositories/LinksRepository')

const CreateServices = require('../services/note/CreateServices')
const IndexServices = require('../services/note/IndexServices')
const ShowServices = require('../services/note/ShowServices')
const DeleteServices = require('../services/note/DeleteServices')


class NotesController {

    async create (request, response) {
        const { title, description, tags, links } = request.body
        const user_id = request.user.id

        const createServices = new CreateServices({ 
            noteRepository: new NoteRepository(), 
            tagsRepository: new TagsRepository(), 
            linksRepository: new LinksRepository() 
        })
        const note = await createServices.execute({ title, description, tags, links, user_id })

        return response.status(201).json(note)
    }

    async index (request, response) {
        const { title, tags } = request.query
        const user_id = request.user.id

        const indexServices = new IndexServices({
            noteRepository: new NoteRepository(), 
            tagsRepository: new TagsRepository()
        })
        const notes = await indexServices.execute({ title, tags, user_id })

        return response.json(notes)
    }

    async show (request, response) {
        const { id } = request.params 

        const showServices = new ShowServices({ 
            noteRepository: new NoteRepository(), 
            tagsRepository: new TagsRepository(), 
            linksRepository: new LinksRepository()
        })
        const data = await showServices.execute({ id })

        return response.json(data)
    }

    async delete (request, response) {
        const { id } = request.params

        const deleteServices = new DeleteServices({
            noteRepository: new NoteRepository()
        })
        await deleteServices.execute({ id })

        return response.json()
    }
}

module.exports = NotesController




