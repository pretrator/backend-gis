const router=require('express').Router()
const User=require("./user")
router.post("/add",(req,res)=>{
    const task=req.body
    const dat={
        data:task.data,
        start:new Date(task.start),
        end:new Date(task.end)
    }
    console.log(dat)
    User.findByIdAndUpdate({_id:req.decodedToken.id},{$push:{task:dat}}).then(()=>{
        res.status(200).send("Task Added")
        console.log("added")
    }).catch((err)=>{
        res.status(401).send("Failed to add")
        next(err)
    })
})

router.post("/",async (req,res)=>{
    const k=await User.findById({_id:req.decodedToken.id},{email:0,pass:0,_id:0,__v:0})
    res.send(k)
})

module.exports=router
