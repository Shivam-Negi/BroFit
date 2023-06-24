const express = require('express');
const router = require('./routes/index.js');
const { serverConfig } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.listen(serverConfig.PORT, async () => {
    console.log(`Server listening on port : ${3000}`);
    connect();
    console.log('mongoose connected');
})