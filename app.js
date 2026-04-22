const express = require('express')
const app = express()
const chatRouter = require('./routes/chatRouter')



app.use(express.json());

app.use('/chats', chatRouter);

module.exports = app;