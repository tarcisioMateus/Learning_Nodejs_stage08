const appError = require('../utils/appError')
const { hash, compare } = require('bcryptjs')

class UpdateServices {
    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async execute ({ id, name, email, currentPassword, newPassword }) {
        const user = await this.userRepository.getById({ id })

        if ( await emailCheck({ email, user, userRepository : this.userRepository }) ) {
            user.email = email
        }

        if ( await passwordCheck({ user, newPassword, currentPassword }) ) {
            user.password = await hash( newPassword, 8 )
        }
        
        user.name = name ? name : user.name

        const updated = await this.userRepository.update({ id, user }) 

        return updated
    }
}

module.exports = UpdateServices

async function emailCheck ({ email, user, userRepository }) {
    if (email) {
        const userWithEmail = await userRepository.findByEmail(email)
        if (userWithEmail && userWithEmail.id !== user.id) {
            throw new appError("this email it's already in use")
        }
        return true
    }
    return false
}

async function passwordCheck ({ user, newPassword, currentPassword }) {

    if (newPassword) {
        if (newPassword && !currentPassword) {
            throw new appError("you must provide your current password if you want it to be updated")
        }
        const passwordCheck = await compare(currentPassword, user.password)
        if (!passwordCheck) {
            throw new appError("the given password it's wrong!")
        }
        return passwordCheck
    }
    return false
}