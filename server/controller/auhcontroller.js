const jwt = require("jsonwebtoken")
const { expressjwt: JWT } = require("express-jwt");


exports.login=(req,res)=>{
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        //login
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})

    }else{
        res.status(400).json({
            error:"รหัสไม่ถูกต้อง"
        })
    }
    res.json({
        username,password
    })
}

exports.requireLogin = JWT({
    secret:`mern-stack-crud-secret@12345`,
    algorithms:["HS256"],
    userProperty:"auth"
})