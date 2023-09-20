const CreateServices = require('./CreateServices')
const UserRepository = require('../../repositories/inMemory/UserRepository')
const appError = require('../../utils/appError')

describe("UserCreateServices", () => {
  let userRepository = null
  let createServices = null

  beforeEach(() => {
    userRepository = new UserRepository()
    createServices = new CreateServices(userRepository)
  })

  it (" user should be created", async () => {
    const user = {
      name: 'User test',
      email: 'user@test.com',
      password: '123'
    }
  
    const userCreated = await createServices.execute(user)
    expect(userCreated).toHaveProperty('id')
  })

  it("Should not create user with existing email", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'user@test.com',
      password: '123'
    }
    const user2 = {
      name: 'User test 2',
      email: 'user@test.com',
      password: '456'
    }

    await createServices.execute(user1)
    await expect(createServices.execute(user2)).rejects.toEqual(new appError("This email it's already in use"))
  })
})