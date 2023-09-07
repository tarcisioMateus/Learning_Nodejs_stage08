const UserRepository = require('../repositories/UserRepository')

const CreateServices = require('../services/sessions/CreateServices')

class SessionsController {
  userRepository = new UserRepository()

  async create(request, response) {
    const { email, password } = request.body

    const createServices = new CreateServices({
      userRepository: this.userRepository
    })
    const data = await createServices.execute({ email, password })

    return response.json(data)
  }
}

module.exports = SessionsController