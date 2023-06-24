const mongoose = require('mongoose');
const {serverConfig} = require('./index');

export const connect = async () => {
    await mongoose.connect(serverConfig.URL);
}