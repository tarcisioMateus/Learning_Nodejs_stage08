require('express-async-errors')
const appError = require('./utils/appError')
const uploadConfig = require('./configs/upload')

const express = require('express')
const cros = require('cros')

const routes = require('./routes')

const app = express()
app.use(cros())
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use(( error, request, response, next ) => {
    if (error instanceof appError) {
        return response.status(error.status).json({
            message : error.message
        })
    }
    return response.status(500).json({
        message : `internal server Error ${error.message}`,
    })
})

const PORT = 3333
app.listen(PORT, console.log(`${PORT}`))