const appError = require("../../../utils/appError")

class UpdateServices {
  constructor({ userRepository, diskStorage }) {
    this.userRepository = userRepository
    this.diskStorage = diskStorage
  }

  async execute({ id, avatarFileName }) {
    const user = await this.userRepository.getById ({ id })

    if (!user) throw new appError("only authenticated users can update the profile")

    if (user.avatar) await this.diskStorage.deleteFile(user.avatar)

    user.avatar = await this.diskStorage.saveFile(avatarFileName)
    await this.userRepository.update ({ id, user })

    return user
  }
}

module.exports = UpdateServices