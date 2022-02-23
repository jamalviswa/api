const jwt = require('jsonwebtoken')
const User = require('../model/usermodel')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      })}
  else {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

const auth = (req,res,next)=>{
   verifyToken(req,res,()=>{
    if(req.user.id ===req.params.id ||req.user.isAdmin){
        next()
    }
    else{
        res.status(500).json('user authentication failed')
    }
   })
}
module.exports = auth
