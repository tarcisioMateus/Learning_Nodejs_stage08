const appError = require('../utils/appError')
const { hash } = require('bcryptjs')

class CreateServices {
    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async execute ({ name, email, password }) {
        const userWithEmail = await this.userRepository.findByEmail (email)

        if (userWithEmail) {
            throw new appError("This email it's already in use")
        }

        const cryptedPassword = await hash(password, 8)

        const user = await this.userRepository.create({ name, email, password: cryptedPassword }) 

        return user
    }
}

module.exports = CreateServices