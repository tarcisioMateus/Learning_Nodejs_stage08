const knex = require("../database/knex")
const appError = require("../utils/appError")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(request, response) {

  }
}

module.exports = SessionsController