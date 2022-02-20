const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('api/todos', require('./routes/todos'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'));
        app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
    } catch (error) {
        console.log('Server Error', error.message)
        process.exit(1);
    }
}

start();