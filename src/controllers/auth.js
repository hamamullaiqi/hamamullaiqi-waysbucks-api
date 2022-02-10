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