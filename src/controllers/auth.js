const { user } = require("../../models")

const Joi = require('joi')


exports.register = async (req,res) => {
    

        const schema = Joi.object({
            fullname : Joi.string().min(5).required(),
            email : Joi.string().email().min(5).required(),
            password : Joi.string().min(6).required(),

        })

        const { error } = schema.validate(req.body)

        if(error) 
        return res.status(400).send({
            error: {
                message : error.details[0].message
            }
        })


    try {

        const newUser = await user.create({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,

        })

        if(newUser.email === req.body.email){
            return res.status(400).send({
                status:"failed",
                message: "User already exists"
            })
        }

        res.status(201).send({
            status: "success",
            message : "Register Succeess",
            data : {
                name: newUser.name,
                email : newUser.email
            }

        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: "failed",
        message: "Server Error",
        });  
        
    }
}



exports.login = async (req,res) => {

    const schema = Joi.object({
        email : Joi.string().email().min(5).required(),
        password  : Joi.string().min(6.).required()

    })

    const { error } = schema.validate(req.body)

    if(error)
    res.status(400).send({
        error : {
            message: error.details[0].message
        }
    })

    try {
        
        const userExist = await user.findOne({
            where: {
                email : req.body.email
            },
            attributes : {
                exclude : ["createdAt", "updateAt"]
            }
        })

        if(!userExist){
            return res.status(400).send({
                status: "failed",
                message: "email & password not match"
            })
        }
        if(userExist.password !== req.body.password){
            return res.status(400).send({
                status: "failed",
                message: "email & password not match"
            })
        }


        res.status(200).send({
            status: "success",
            message : "Login Success",
            data: {
                fullname: userExist.fullname,
                email : userExist.email
            }
        })

    } catch (error) {
        console.log(error);
        res.send({
        status: "failed",
        message: "Server Error",
        });
        
    }
}