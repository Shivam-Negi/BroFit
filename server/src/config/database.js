const mongoose = require('mongoose');
const { URL } = require('./server_config');

const connect = async () => {
    await mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    connect
};