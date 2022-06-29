const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan') // allows us to log request
const bodyparser = require('body-parser')
const path = require('path')
dotenv.config({ path: './config.env'})
const PORT = process.env.PORT || 8080
const connectDB = require('./server/database/connection') // connect to database 
const app = express(); 
// logs requests 
app.use(morgan('tiny'))
// mongodb connection 
connectDB();
// parse request to body 
app.use(bodyparser.urlencoded({ extended:true}))
// set view engine 
app.set('view engine', 'ejs')
// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
// load routers 
app.use('/', require('./server/routes/router'))
// server port 
app.listen(3000, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})