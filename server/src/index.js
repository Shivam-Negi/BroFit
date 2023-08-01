const express = require('express');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index.js');
const { serverConfig, database } = require('./config');
const cors = require('cors');
const { graphCron, checkOutCron, planExCron, graphResetCron } = require('./utils/common/cron-jobs.js');

const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 30, // Limit each IP to 30 requests per `window` (here, per 2 minutes)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);

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
