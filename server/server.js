const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const blogrouter = require("./routes/blog")
require("dotenv").config()
const authRouth = require('./routes/auth')

const app = express()


//conect clound database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>{console.log(err)})


//middleware 
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use("/api",blogrouter)
app.use("/api",authRouth)

const port = process.env.PORT || 8080;
app.listen(port,()=>console.log(`start server in port ${port}`))
