class DeleteServices {
  constructor({ noteRepository }) {
    this.noteRepository = noteRepository
  }

  async execute({ id }) {
    this.noteRepository.removeById({ id })
  }
}

module.exports = DeleteServices
    