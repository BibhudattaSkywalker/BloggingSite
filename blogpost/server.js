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
app.use('/api',userRoutes);
app.use('/api/auth',blogRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log('server connected')
})