require('express-async-errors')
const appError = require('./utils/appError')

const express = require('express')

const routes = require('./routes')

const app = express()
app.use(express.json())

app.use(routes)

app.use(( error, request, response, next ) => {
    if (error instanceof appError) {
        return response.status(error.status).json({
            message : error.message
        })
    }
    return response.status(500).json({
        message : 'internal server Error',
    })
})

const PORT = 3333
app.listen(PORT, console.log(`${PORT}`))