const express = require('express')
const handlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const cookieParser = require('cookie-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const { connectDB , objetConfig } = require('./config/index.js')
const { initSession } = require('./config/session.config.js')
const { initSocket } = require('./config/socket.config.js')
const routerApp = require('./routes/index.js')

const path = require('path')

const { port , mongo_url , cookie_parser_secret } = objetConfig

const app = express()
const httpServer = app.listen(port, error => {
    if (error) console.log(error)
    console.log('Server escuchando en el puerto ' + port)
})

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../src/views/layouts'),
    partialsDir: path.join(__dirname, '../src/views')
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '../src/views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser(cookie_parser_secret))

initSession(app, mongo_url)

app.use(routerApp)

initSocket(httpServer)


