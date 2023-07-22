const express = require('express');
const router = require('./routes/index.js');
const { serverConfig, database } = require('./config');
const cors = require('cors');
const { graphCron, checkOutCron, planExCron, graphResetCron } = require('./utils/common/cron-jobs.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'public' folder (assuming 'index.html' is inside the 'public' folder)
app.use(express.static('public'));

app.use('/api', router);

app.listen(serverConfig.PORT, async () => {
    console.log(`Server listening on port : ${serverConfig.PORT}`);
    database.connect();
    console.log('mongoose connected');
    graphCron();
    checkOutCron();
    planExCron();
    graphResetCron();
});
