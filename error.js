const eroute=require("express").Router()

eroute.use((err,req, res, next)=> {
    console.log("ERRORDFSDF")
    res.status(402).send("Error")
  });

module.exports=eroute
