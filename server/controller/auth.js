const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try {
        const { email,password } = req.body
        if(!email){
            return res.status(400).json({ message: 'Email is Require'})
        }
        if(!password){
            return res.status(400).json({ message: 'Password is Require'})
        }

        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(user){
            return res.status(400).json({
                message: "Email already exits"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)
        

        await prisma.user.create({
            data:{
                email,
                password: hashPassword
            }
        })
        return res.status(201).json({
            message: 'Register success'
          })
        
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}


exports.login = async(req,res)=>{
    try {
        const { email, password} = req.body
        const user = await prisma.user.findFirst({
            where: {
                email:email
            }
        })
        if (!user || !user.enable){
            return res.status(400).json({   message: 'User Not found or have been disabled'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({   message: 'Password Invalid'})
        }
        const payload={
            id:user.id,
            email:user.email,
            role:user.role
        }

        jwt.sign(payload,process.env.SECRET,{
            expiresIn:'1d'},
            (err,token)=>{
                if(err){
                    return res.status(500),json({ message:"Server Error"})
                }
                res.json({  payload,token   })
            }
            )
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}


exports.currentUser= async(req,res)=>{
    try {
    res.send('Current User')
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}

