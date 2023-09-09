class UserRepository {
  users = []

  async findByEmail (email) {
    const user = this.users.find( user => user.email === email )

    return user
  }

  async create ({ name, email, password }) {
    const user = {
      id: this.users.length + 1, 
      avatar: null,
      name, email, password
    }
    this.users.push( user )

    return user
  }

  async getById ({ id }) {
    const user = this.users.find( user => user.id === id )

    return user
  }

  async update ({ id, user }) {
    const index = this.users.findIndex( user => user.id === id )

    if ( index === -1 ) return {}

    this.users[ index ] = user
    return user
  }
}

module.exports = UserRepository