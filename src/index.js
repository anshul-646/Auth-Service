const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const v1ApiRouter = require('./routes/index');

const setupAndstartServer = async () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',v1ApiRouter);

    app.listen(PORT,() => {
        console.log(`Server started at ${PORT}`);
    })
}

setupAndstartServer();