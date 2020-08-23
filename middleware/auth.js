const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = function(req,res,next){ 
    const token =req.header("x-auth-token"); // getting the token from the header
    if(!token){
        return res.status(401).json({msg:"Not authorized"}); //Deny message if no token
    }
    try { //if the token is valid, decode the token and send to the api
        //by embedding the user in request
        const decoded = jwt.verify(token, config.get("token"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg:"Invalid token"});
    }
}