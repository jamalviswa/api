const Driver = require('../model/drivermodel')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs') 
const sequelize = require('sequelize')
//@desc create a new driver
//@route post api/v1/drivers/register
// public


const createDriver=async(req,res)=>{

const existDriver = await Driver.findOne({where:{email:req.body.email}})
if(existDriver){
    res.status(400).json({msg:'driver already existed',status:'0'})
}
 else{ 
 try {
    const salt = await bcrypt.genSalt(10)
       const savedDriver= await Driver.create({
           name:req.body.name,
           email:req.body.email,
           password:await bcrypt.hash(req.body.password, salt),
           phoneNumber:req.body.phoneNumber
       })
        res.status(200).json({msg:'api success',status:'1',data:'driver details created'})
        
    } catch (err) {
        res.status(400).json({msg:'api failed',status:'0',data:err})
    }
}}

//@desc login driver
//@route post api/v1/drivers/login
// public
const loginDriver=async(req,res)=>{
    const {email,password} = req.body
    const driver = await Driver.findOne({where:{email:email}})
    
     
if(driver&& (await bcrypt.compare(password,driver.password))){
      res.status(200).json({msg:'api success',status:'1',
      data:{id:driver.id,
      name:driver.name,
      email:driver.email,
      phoneNumber:driver.phoneNumber,
      token: generateToken(driver.id),
}})

}
   else{
    res.status(400).json({data:'invalid email or password',status:'0',msg:'api failed'})
   }}
 //@desc update driver
//@route post api/v1/drivers/update/:id
// public       

    const updateDriver = async(req,res)=>{
        

        const driver = await Driver.findByPk(req.params.id)
        if(driver){
            driver.name = req.body.name || driver.name,
            driver.email = req.body.email || driver.email,
            driver.phoneNumber=req.body.phoneNumber || driver.phoneNumber
            driver.save()
            res.status(200).json({msg:'api success',status:'1',data:'driver details updated'})
        }
        else{
            res.status(400).json({status:'1',data:'driver not updated',msg:'api failed'})
        }
    } 

   //@desc get user
  //@route post api/v1/drivers/:id
  // public         
    
const getDriver = async(req,res)=>{
    try {
        const driver = await Driver.findByPk(req.params.id)
        res.status(200).json({status:'1',msg:'api success',data: driver})
    } catch (error) {
        res.status(400).json({status:'0',msg:'api failed',data: error})
    }
}


//@desc get all the drivers
//@route get api/v1/alldrivers
// public
const getAllDrivers=async(req,res)=>{
    try {

         const allDriver =await Driver.findAll()
           
            res.status(200).json({status:'1',msg:'api success',data: allDriver})
           
        } catch (error) {
            res.status(500).json({status:'0',msg:'api failed',data: error})
           
        }
       }

//@desc get specific the drivers
//@route get api/v1/drivers/specific
// public
const getDriversByTime=async(req,res)=>{
    try {
            const page= parseInt(req.query.page)
            const limit =parseInt(req.query.limit)
            const results={}
            const startIndex = (page-1)*limit
            const endIndex = page*limit
         
            results.results=await Driver.findAll({
                where: {
                  'createdAt':
                    { offset: startIndex, limit: limit }
                  }
              })
             res.paginated=results
            res.status(200).json({status:'1',msg:'api success',data: res.paginated})
           } catch (error) {
            res.status(500).json({status:'1',msg:'api failed',data: error})
        }}
const countDrivers = async(req,res)=>{
            try {
                    const totalDrivers = await Driver.findAll({
                        attributes:[ 
                          [sequelize.fn('COUNT', sequelize.col('phoneNumber')), 'No of Drivers'],
                    ]
                    })
                    res.status(200).json({status:'1',msg:'api success',data:totalDrivers})
                } catch (error) {
                    res.status(500).json({status:'0',msg:'api failed',data:error})
                }
            }


const getPaginatedDrivers = async(req,res)=>{
    try {
        const page= parseInt(req.query.page)
        const limit =parseInt(req.query.limit)
        const results={}
        const startIndex = (page-1)*limit
        const endIndex = page*limit
     
        results.results=await Driver.findAll(
          {offset: startIndex, limit: limit}
        )
         res.paginated=results
        res.status(200).json({status:'1',msg:'api success',data: res.paginated})
       } catch (error) {
        res.status(500).json({status:'1',msg:'api failed',data: error})
    }}
module.exports={createDriver,loginDriver,updateDriver,getDriver,getAllDrivers,getDriversByTime,countDrivers,getPaginatedDrivers}