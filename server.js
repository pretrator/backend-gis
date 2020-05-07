const express = require('express');
const mongoose = require('mongoose');
const config=require("./config")
const bodyParser=require("body-parser")
const expjwt=require("express-jwt")
const error=require("./error")
const print=console.log
mongoose.connect(config.mongouri,config.dboptions).then(()=>print("DB Connected")).catch(()=>print("FAiled to connect DB"))
const app=express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth",require("./auth"))
app.use(require("./tokenparse"))
app.use("/task",require("./taskroute"))
app.use(error);
app.listen(config.port,()=>console.log("Server Listening"))