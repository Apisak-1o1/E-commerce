exports.create= async(req,res)=>{
    try {
    res.send('Create Cate')
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}
exports.list= async(req,res)=>{
    try {
    res.send('List Cate')
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}
exports.remove= async(req,res)=>{
    try {
    res.send('Remove Cate')
    } catch (err) {
       console.log(err) 
       res.status(500).json({ message:"server Error" })
    }
}

