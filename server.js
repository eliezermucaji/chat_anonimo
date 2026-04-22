const app = require('./app')
require('dotenv').config()
const http = require('http')
const PORT = process.env.PORT || 3000
const {initSocket} = require('./services/socket')
const server = http.createServer(app);

initSocket(server)

const init = ()=>{
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`)
}

server.listen(PORT, init);