const User = require('../model/usermodel')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs') 
const sequelize = require('sequelize')
const Wallet = require('../model/wallet')
//@desc create a new user
//@route post api/v1/users/register
// public


const createUser=async(req,res)=>{

const existUser = await User.findOne({where:{email:req.body.email}})
if(existUser){
    res.status(400).json({msg:'user alreasy existed',status:'0'})
}
if (!(req.body.email && req.body.password && req.body.name && req.body.phoneNumber)) {
    res.status(400).send("All input is required");
  }
 else{ 
 try {
    const salt = await bcrypt.genSalt(10)
       const savedUser= await User.create({
           name:req.body.name,
           email:req.body.email.toLowerCase(),
           password:await bcrypt.hash(req.body.password, salt),
           phoneNumber:req.body.phoneNumber
 })
  const walletCreation = await Wallet.create({
      balance:0,
      userId:savedUser.id
  })
    res.status(200)
    .json({ msg: "api success", status: "1", data: "user created and wallet created" });
        console.log(savedUser)
    } catch (err) {
        res.status(500).json({status:'0',msg:'api failed',data:err})
    
    }
}}

//@desc login user
//@route post api/v1/users/login
// public
const loginUser=async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({where:{email:email}})
    if (!(email && password)) {
        res.status(400).send("All input is required");
      }  
     
if(user&& (await bcrypt.compare(password ,user.password))){
      res.status(200).json({msg:'api success',status:'1',
      data:{id:user.id,
      name:user.name,
     email:user.email,
    phoneNumber:user.phoneNumber,
    token: generateToken(user.id,user.isAdmin),

}})
       console.log('login success')
}
   else{
    res.status(400).json({msg:'invalid email or password',status:'0'})
   }}
 //@desc update user
//@route post api/v1/users/update/:id
// public       

    const updateUser = async(req,res)=>{
        

        const user = await User.findByPk(req.params.id)
        if(user){
            user.name = req.body.name || user.name,
            user.email = req.body.email || user.email,
            user.phoneNumber=req.body.phoneNumber || user.phoneNumber
            user.save()
            res.status(200).json({status:'1',msg:'user detail updated'})
        }
        else{
            res.status(400).json({status:'1',msg:'user not updated'})
        }
    } 

   //@desc get user
  //@route post api/v1/users/:id
  // public         
    
const getUser = async(req,res)=>{
    try {
        const user = await User.findByPk(req.params.id)
        res.status(200).json({status:'1',msg:'api success',data: user})
    } catch (error) {
        res.status(400).json({status:'0',msg:'api failed',data: error})
    }
}


//@desc get all the users
//@route get api/v1/allusers
// public
const getAllUsers=async(req,res)=>{
   try {
       const users = await User.findAll()
       res.status(200).json({data:users,status:'1',msg:'api success'})
   } catch (error) {
 res.status(500).json({status:'0',msg:'api failed',data: error})
     
          
 } }

//@desc get specific the users
//@route get api/v1/users/specific
// public
const getUsersByTime=async(req,res)=>{
    try {
            const page= parseInt(req.query.page)
            const limit =parseInt(req.query.limit)
            const results={}
            const startIndex = (page-1)*limit
            const endIndex = page*limit
         
            results.results=await User.findAll(
              {offset: startIndex, limit: limit}
            )
             res.paginated=results
            res.status(200).json({status:'1',msg:'api success',data: res.paginated})
           } catch (error) {
            res.status(500).json({status:'1',msg:'api failed',data: error})
        }}
//@desc get specific the users
//@route get api/v1/users/specific
// public
const getSpecificUsers=async(req,res)=>{
    try {
        const users = await User.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('email')), 'no of email']]
          }})
        res.status(200).json({data:users,status:'1',msg:'api success'})
           } catch (error) {
            res.status(500).json({status:'0',msg:'api failed',data: error})
        }}


const getAdminUsers = async(req,res)=>{
try {
    const adminUser = await User.findAll({
        where:{
            isAdmin:true
        }
    })
    res.status(200).json({status:'1',msg:'api success',data:adminUser})
} catch (error) {
    res.status(500).json({status:'0',msg:'api failed',data:error})
}
}

const countUsers = async(req,res)=>{
try {
        const totalUsers = await User.findAll({
            attributes:[ 
             
                [sequelize.fn('COUNT', sequelize.col('email')), 'No of Users'],
        ]
        })
        res.status(200).json({status:'1',msg:'api success',data:totalUsers})
    } catch (error) {
        res.status(500).json({status:'0',msg:'api failed',data:error})
    }
}





module.exports={createUser,loginUser,updateUser,getUser,getAllUsers,getUsersByTime,getSpecificUsers,getAdminUsers,countUsers}
