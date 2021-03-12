const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/db.config')


exports.verify = (req,res,next) => {
    //get creden of user that create secret
    if(!req.headers){
        res.status(401).send({
            message: "Login is required to create Secret!"
        })
    }

    const token = req.headers["token"]

    let user
    if(token == ""){
        res.status(401).send({
            message: "Invalid Token!"
        })
    }else {
        try{
            user = jwt.verify(token,JWT_SECRET)
            req.user = user
            next()
        }catch(err){
            res.status(401).send({
                message: "Invalid Token!"
            })
        }     
    }
}