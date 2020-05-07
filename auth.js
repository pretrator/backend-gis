const router=require("express").Router()
const User=require("./user")
const Bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const config=require("./config")

router.post("/register",async (req,res)=>{
    const data=req.body
    data.pass=await Bcrypt.hash(data.pass,10)
    const newUser=new User(data)
    newUser.save().then(()=>{
        res.send("New User Registered")
    }).catch((err)=>{
        res.send("Failed to register user")
    })
})

router.post("/login",async(req,res)=>{
    const data=req.body
    const user=await User.findOne({email:data.email})
    const dopassmatch=user===null? false : await Bcrypt.compare(data.pass,user.pass)
    console.log(user,dopassmatch)
    if(dopassmatch){
        const token=jwt.sign({id:user._id},config.secret)
        return res.json({token:token})
    }
    res.send("Login Failed")
})

module.exports=router