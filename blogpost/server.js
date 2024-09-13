const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
require('./db/dbConfig')
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, HEAD, OPTIONS, POST, PUT, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.get('/t', (req, res) => {
    res.send('APIs SERVER is perfectly working..');

    res.json({
        message: 'Welcome to the API',
        api_version: '1.0',
    });
});
app.use('/api',userRoutes);
app.use('/api/auth',blogRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log('server connected')
})