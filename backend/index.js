const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/handler.js')


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on the port ${PORT}.`);
})