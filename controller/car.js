
const Car  = require('../model/carmodel')


//@desc create a new rideRequest
//@route post api/v1/rideRequest
// private
const createCar=async(req,res)=>{
    try{
        const savedCar= await Car.create({
            carName:req.body.carName,
            carModel:req.body.carModel,
            driverId:req.body.driverId
        })
         res.status(200).json({msg:'api success',status:'1',data:savedCar})
    
     } catch (err) {
         res.status(500).json({status:'0',msg:'api failed',data:err})
     }
    }

    const getAllCars=async(req,res)=>{
        try{
            const getAllCars= await Car.findAll()
             res.status(200).json({msg:'api success',status:'1',data:getAllCars})
        
         } catch (err) {
             res.status(500).json({status:'0',msg:'api failed',data:err})
         }
        }


    module.exports ={createCar,getAllCars}