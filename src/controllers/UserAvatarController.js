const DiskStorage = require("../providers/DiskStorage")
const UserRepository = require('../repositories/UserRepository')

const UpdateServices = require('../services/user/avatar/UpdateServices')

class UserAvatarController {
  diskStorage = new DiskStorage()
  userRepository = new UserRepository()

  async update(request, response) {
    const user_id = request.user.id
    const avatarFileName = request.file.filename
    
    const updateServices = new UpdateServices ({
      userRepository: this.userRepository, 
      diskStorage: this.diskStorage
    })
    const user = await updateServices.execute({ id: user_id, avatarFileName })

    return response.json(user)
  }
}

module.exports = UserAvatarController