const mongoose = require('mongoose');
const {serverConfig} = require('./index');

const connect = async () => {
    await mongoose.connect(serverConfig.URL);
}

module.exports = connect;