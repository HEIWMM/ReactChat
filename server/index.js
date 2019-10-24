const indexRouter = require('./routes.js')
const bodyParser = require('body-parser');
const express = require('express')
const cookieParase = require('cookie-parser');
const app = express()
const server = require('http').createServer(app)

const io = require('./socketIO/test.js')(server)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParase());
app.use('/',indexRouter)
server.listen(4000, () => console.log('listen 4000'))