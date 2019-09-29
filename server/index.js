const indexRouter = require('./routes.js')
const bodyParser = require('body-parser');
const express = require('express')
const cookieParase = require('cookie-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParase());
app.get('/bb', (req, res) => res.send('Hello World!'))
app.use('/',indexRouter)
app.listen(4000, () => console.log('Example app listening on port 4000!'))