const express = require('express');

const { PORT } = require('./configs/serverConfig');
const db = require('./configs/dbConfig');

require('./crons/scheduleCron');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);
    await db.connect();
    console.log('Db successfully connected');
});