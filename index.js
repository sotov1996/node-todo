const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://sotov:01061996@cluster0.lqqp6.mongodb.net/todos',
{
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}) //Подключил MongoDB

app.use('/api', require('./api'))

app.listen(4000, () => {
    console.log('server is listening')
})