
const RideRequest  = require('../model/ridemodel')


//@desc create a new rideRequest
//@route post api/v1/rideRequest
// private
const createRideRequest=async(req,res)=>{
    try{
        const savedRide= await RideRequest.create({
            dropoffAddress:req.body.dropoffAddress,
            pickupAddress:req.body.pickupAddress,
            paymentMethod:req.body.paymentMethod,
            userId:req.body.userId,
            driverId:req.body.driverId,
        })
         res.status(200).json({msg:'api success',status:'1',data:savedRide})
    
     } catch (err) {
         res.status(500).json({status:'0',msg:'api failed',data:err})
     }
    }


const getRideRequests = async(req,res)=>{
    try {

        const allRideRequest =await RideRequest.findAll()
          
           res.status(200).json({status:'1',msg:'api success',data: allRideRequest})
          
       } catch (error) {
           res.status(500).json({status:'0',msg:'api failed',data: error})
          
       }
      }


module.exports={ createRideRequest,getRideRequests}