const UserRepository = require('../repositories/UserRepository')
const CreateServices = require('../services/user/CreateServices')
const UpdateServices = require('../services/user/UpdateServices')

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const createServices = new CreateServices(userRepository)
        await createServices.execute({ name, email, password })

        return response.status(201).json()
    }

    async update (request, response) {
        const { name, email, currentPassword, newPassword } = request.body
        const user_id = request.user.id

        const userRepository = new UserRepository()
        const updateServices = new UpdateServices(userRepository)
        await updateServices.execute({ id: user_id , name, email, currentPassword, newPassword })

        return response.json()
    }
}

module.exports = UsersController

