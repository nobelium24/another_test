const express = require("express")
const app = express()
const cors = require ("cors")
require("dotenv").config()
app.use(cors({origin:"*"}))
const router = require("./routes/route")
const bodyParser= require("body-parser")
app.use(bodyParser.urlencoded({extended:true, limit:"70mb"}))
app.use(bodyParser.json({limit:"70mb"}))
app.use("/user", router)
const URI = process.env.MONGO_URI
const mongoose = require("mongoose")
mongoose.connect(URI, (err)=>{
    if (err) {
        console.log(err, "connection error");
    }else{
        console.log("success");
    }
})

app.listen(4000, ()=>{
    console.log("app started");
})