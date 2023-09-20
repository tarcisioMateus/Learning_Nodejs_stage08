const CreateServices = require('./CreateServices')
const UpdateServices = require('./UpdateServices')
const SessionsCreateServices = require('../sessions/CreateServices')

const UserRepository = require('../../repositories/inMemory/UserRepository')
const appError = require('../../utils/appError')

describe("UserUpdateServices", () => {
  let userRepository = null
  let createServices = null
  let updateServices = null
  let sessionsCreateServices = null


  beforeEach(() => {
    userRepository = new UserRepository()
    createServices = new CreateServices(userRepository)
    updateServices = new UpdateServices(userRepository)
    sessionsCreateServices = new SessionsCreateServices({ userRepository: userRepository})
  })

  it ("can NOT update email to one being used", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'user1@test.com',
      password: '123'
    }
    const user1Created = await createServices.execute(user1)

    const user2 = {
        name: 'User test 2',
        email: 'user2@test.com',
        password: '456'
    }
    await createServices.execute(user2)

    const updated = {
        id: user1Created.id,
        email: 'user2@test.com',
    }
    await expect(updateServices.execute(updated)).rejects.toEqual(new appError("this email it's already in use"))
  })

  it("Should not update password missing current password", async () => {
    const user1 = {
        name: 'User test 1',
        email: 'user1@test.com',
        password: '123'
    }
    const user1Created = await createServices.execute(user1)
  
    const updated = {
        id: user1Created.id, 
        newPassword: '456',
    }
    await expect(updateServices.execute(updated)).rejects.toEqual(
        new appError("you must provide your current password if you want it to be updated")
    )
  })

  it("Should not update with wrong password", async () => {
    const user1 = {
        name: 'User test 1',
        email: 'user1@test.com',
        password: '123'
    }
    const user1Created = await createServices.execute(user1)
  
    const updated = {
        id: user1Created.id,
        currentPassword: '456', 
        newPassword: '456',
    }
    await expect(updateServices.execute(updated)).rejects.toEqual(
        new appError("the given password it's wrong!")
    )
  })

  it("Should Login with new password after being updated", async () => {
    const user1 = {
        name: 'User test 1',
        email: 'user1@test.com',
        password: '123'
    }
    const user1Created = await createServices.execute(user1)
  
    const updated = {
        id: user1Created.id,
        currentPassword: '123', 
        newPassword: '456',
    }
    await updateServices.execute(updated)

    const newSession = await sessionsCreateServices.execute({
        email: 'user1@test.com', password: '456'
    })
    expect(newSession).toHaveProperty('user')
  })


})