const knex = require("../database/knex")
const appError = require("../utils/appError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {

  async update(request, response) {
    const user_id = request.user.id
    const avatarfileName = request.file.filename
    
    const diskStorage = new DiskStorage()

    const user = await knex('users').where({id: user_id}).first()

    if (!user) throw new appError("only authenticated users can update the profile")

    if (user.avatar) await diskStorage.deleteFile(user.avatar)

    user.avatar = await diskStorage.saveFile(avatarfileName)
    await knex('users').update(user).where({id: user_id})

    return response.json(user)
  }
}

module.exports = UserAvatarController