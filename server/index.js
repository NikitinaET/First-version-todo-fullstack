const express = require('express');
const bodyParser = require('body-parser');
const task = require('./routes/task.route');
const connection = require("./db");
const cors = require("cors");
const app = express();
const port = 1025;

connection();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/tasks', task);

app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
});