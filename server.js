const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')


dotenv.config()
app.use(express.json());
app.use(cors())



const userRoutes = require('./routes/user')
app.use('/demo/user/',userRoutes)

const postRoutes = require('./routes/post')
app.use('/demo/post/',postRoutes)

const groupRoutes = require('./routes/group')
app.use('/demo/group/',groupRoutes)


app.use('/public', express.static(process.cwd() + '/public'))

mongoose.connect(process.env.Db).then((res)=>{
    console.log(`database is connect successfully`)
})
.catch(err=>{
    console.log(`database is not connect successfully`)
})


app.listen(process.env.Port, ()=>{
    console.log(`server is running is on port ${process.env.Port}`)
})

//mongodb+srv://asghar:CTx8sZGA9tVEEIRI@cluster0.gc8mmvt.mongodb.net/PROJECT3?retryWrites=true&w=majority