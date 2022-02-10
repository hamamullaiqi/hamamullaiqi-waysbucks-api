const { user } = require("../../models")

const Joi = require('joi')

const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')


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
        //time bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //validate user exits
        const userExist = await user.findOne({
            where: {
                email : req.body.email
            },
        })


        if( !userExist ){
            const newUser = await user.create({
                fullname : req.body.fullname,
                email : req.body.email,
                password : hashedPassword,

            })

            const SECRET_KEY = 'bebas'
            const token = jwt.sign({id : newUser.id}, SECRET_KEY)
            res.status(201).send({
                status: "success",
                message : "Register Succeess",
                data :  {
                    user : {
                        fullname: newUser.fullname,
                        token
                    }
                }

        })

        } else {
            return  res.status(400).send({
                status:"failed",
                message: "User already exists"
            })
        }
    
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

        const isValid = bcrypt.compare(req.body.password, userExist.password)

        if(!isValid){
            return res.status(400).send({
                status: "failed",
                message: "email & password not match"
            })
        }


        // if(userExist.password !== req.body.password){
        //     return res.status(400).send({
        //         status: "failed",
        //         message: "email & password not match"
        //     })
        // }

        const SECRET_KEY = 'bebas'
        const token = jwt.sign({id : userExist.id}, SECRET_KEY)

        res.status(200).send({
            status: "success",
            message : "Login Success",
            data: {
                fullname: userExist.fullname,
                email : userExist.email,
                token
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