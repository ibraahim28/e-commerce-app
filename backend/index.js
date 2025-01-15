const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/DB');
const userRouter = require('./src/routers/userRouter')
const authRouter = require('./src/routers/authRouter')
const productRouter = require('./src/routers/productRouter')
app.use(cors())
app.use(express.json())


app.use('/user', userRouter)
app.use('/', authRouter)
app.use('/product', productRouter)

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})