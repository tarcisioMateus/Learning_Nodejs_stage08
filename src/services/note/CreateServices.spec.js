const CreateServices = require('./CreateServices')

const NoteRepository = require('../../repositories/inMemory/NoteRepository')
const TagsRepository = require('../../repositories/inMemory/TagsRepository')
const LinksRepository = require('../../repositories/inMemory/LinksRepository')

const appError = require('../../utils/appError')

describe("Note/ CreateServices", () => {
  let noteRepository = null
  let tagsRepository = null
  let linksRepository = null

  let createServices = null

  beforeEach(() => {
    noteRepository = new NoteRepository()
    tagsRepository = new TagsRepository()
    linksRepository = new LinksRepository()

    createServices = new CreateServices({ noteRepository, tagsRepository, linksRepository })
  })

  it ("Should NOT create a note without a title", async () => {

    await expect(createServices.execute({ 
      description: 'bla bla bla!', user_id: 1 
    })).rejects.toEqual(
      new appError("You can't created a new note without a title.")
    )
  })

  it ("Should NOT create a note without description nor links", async () => {

    await expect(createServices.execute({ 
      title: 'note1', links:[], user_id: 1 
    })).rejects.toEqual(
      new appError("it's pointless creating a note with no description nor links")
    )
  })

  it ("Should NOT create a note without tags", async () => {

    await expect(createServices.execute({ 
      title: 'note1', links:['l1'], tags:[], user_id: 1 
    })).rejects.toEqual(
      new appError("please add some tag, to help you organize your notes")
    )
  })

  it("Should create a new note successfully", async () => {

    const noteCreated = await createServices.execute({ 
      title: 'note1', description: 'bla bla bla', links:[], tags: ['t1', 't2'], user_id: 1
    })
    expect(noteCreated).toHaveProperty('id')
  })
})