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
        res.send('Register success')
        


    res.send('reister')
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}


exports.login = async(req,res)=>{
    try {
    res.send('login')
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

