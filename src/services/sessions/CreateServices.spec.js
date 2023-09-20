const CreateServices = require('../sessions/CreateServices')
const UserCreateServices = require('../user/CreateServices')

const UserRepository = require('../../repositories/inMemory/UserRepository')
const appError = require('../../utils/appError')

describe("Sessions/ UpdateServices", () => {
  let userRepository = null

  let userCreateServices = null
  let createServices = null

  beforeEach(() => {
    userRepository = new UserRepository()

    userCreateServices = new UserCreateServices(userRepository)
    createServices = new CreateServices({ userRepository: userRepository})
  })

  it ("Should NOT login with wrong password", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'user1@test.com',
      password: '123'
    }
    await userCreateServices.execute(user1)

    await expect(createServices.execute({
        email: 'user1@test.com', password: '456'
    })).rejects.toEqual(new appError('wrong email or password', 401))
  })

  it("Should NOT login with wrong email", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'user1@test.com',
      password: '123'
    }
    await userCreateServices.execute(user1)

    await expect(createServices.execute({
        email: 'user123@test.com', password: '123'
    })).rejects.toEqual(new appError('wrong email or password', 401))
  })

  it("Should start new session successfully", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'user1@test.com',
      password: '123'
    }
    await userCreateServices.execute(user1)

    const newSession = await createServices.execute({
      email: 'user1@test.com', password: '123'
    })
    expect(newSession).toHaveProperty('user')
  })

})