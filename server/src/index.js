const express = require('express');
const router = require('./routes/index.js');
const { serverConfig, database } = require('./config');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.listen(serverConfig.PORT, async () => {
  console.log(`Server listening on port : ${serverConfig.PORT}`);
  database.connect();
  console.log('mongoose connected');
});
