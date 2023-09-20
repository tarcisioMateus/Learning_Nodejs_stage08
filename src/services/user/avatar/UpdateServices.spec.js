const CreateServices = require('../CreateServices')
const UpdateServices = require('./UpdateServices')

const DiskStorage = require('../../../providers/DiskStorageInMemory')
const UserRepository = require('../../../repositories/inMemory/UserRepository')

describe("User/Avatar/ UpdateServices", () => {
  let userRepository = null
  let diskStorage = null

  let createServices = null
  let updateServices = null

  beforeEach(() => {
    userRepository = new UserRepository()
    diskStorage = new DiskStorage()

    createServices = new CreateServices(userRepository)
    updateServices = new UpdateServices({ userRepository, diskStorage })
  })

  it ("user avatar should be updated", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'user1@test.com',
      password: '123'
    }
    const user1Created = await createServices.execute(user1)

    const avatarUpdated = {
      id: user1Created.id,
      avatarFileName: 'avatar.jpe'
    }
    const updated = await updateServices.execute(avatarUpdated)
    expect(updated).toMatchObject({avatar: 'avatar.jpe'})
  })

})