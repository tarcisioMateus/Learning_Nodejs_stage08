const CreateServices = require('./CreateServices')
const UserRepository = require('../../repositories/inMemory/UserRepository')

it (" user should be created", async () => {
  const user = {
    name: 'User test',
    email: 'user@test.com',
    password: '123'
  }

  const userRepository = new UserRepository()
  const createServices = new CreateServices(userRepository)
  const userCreated = await createServices.execute(user)

  expect(userCreated).toHaveProperty('id')
})