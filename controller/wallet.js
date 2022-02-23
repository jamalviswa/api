const User = require("../model/usermodel")
const Wallet = require("../model/wallet")



const addMoneyToTheWallet = async(req,res)=>{


    try {
         const done =await  Wallet.findOne({ where: { userId: req.params.id } });
         console.log(done)
         if (!done) {
           await Wallet.upda({
             userId: req.params.id,
             balance: req.body.amount,
           });
         } else {
           await done.update({ balance: (req.body.amount+done.balance)});
         }
         res.status(200).json({
           status: "1",
           msg: "api success",
         });
    } catch (error) {
         res.status(400).send(error)
    }

}


const walletTransfer = async(req,res)=>{
    const myId = req.params.id
    const { recipientId,amount} = req.body
  
    try {
        const myAccount =await Wallet.findOne({where:{userId:myId}})
        if(myAccount.balance > amount){
            const recipient = await Wallet.findOne({where:{userId:recipientId}})
            await recipient.update({balance :(amount+recipient.balance) })
            await myAccount.update({balance: (myAccount.balance-amount)})
            res.status(200).json({data:'transaction success',status:'1',msg:'api success'}) 
       }
        else{
            res.status(500).json({msg:'api failure',status:'0',data:'insufficient balance in your wallet'})
        }
    } catch (error) {
        res.status(500).json({msg:'api failure',status:'0',data:error})
    }
}

const walletAmount = async(req,res)=>{
 const id = req.params.id
 try {
     const userWalletData = await Wallet.findOne({ where: {userId: id}})
    
     res.status(200).json({
         status:'1',msg:'api success',data: userWalletData.balance,
     })
 } catch (error) {
     res.status(400).json({
         status:'1',msg:'api success',data:error
     })
 }}
  
module.exports = {addMoneyToTheWallet,walletTransfer,walletAmount}