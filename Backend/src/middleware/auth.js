const jwt = require('jsonwebtoken');
const User = require('../models/user')
// const adminAuth = (req,res,next)=>{
//     console.log("auth getting checked");
//     const token = "abc";
//     const isAdminVerify=token==="abc";
//     if(!isAdminVerify){
//         res.status(401).sent("Unauthorized request");
//     }
//     else{
//         next();
//     }
// };

const userAuth = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid!!!!");
        }
        const decodedObj = await jwt.verify(token,'DEV@Tinder');
        const {_id}=decodedObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
}

module.exports={userAuth};