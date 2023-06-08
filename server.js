/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
// const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
app.use(express.static(__dirname + '/dist'))
// app.use(favicon(__dirname + '/favicon.ico'))
const port = process.env.PORT || 8080
app.listen(port)
console.log('server started ' + port)