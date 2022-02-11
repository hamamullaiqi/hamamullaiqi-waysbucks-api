const {user} = require("../../models")


exports.getUsers = async (req,res) => {
    try {

        const users = await user.findAll({
            attributes : {
                exclude : ["createdAt", "updatedAt", "password"]
            }
        })

        res.send({
            status:"success",
            data: {
                users,
                
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async (req, res) => {
    try {

        const { id } = req.params
        const dataUser = await user.findOne({
            where : {
                id
            }
        })

        res.send({
            status: "success",
            message : `User by id : ${id} `,
            dataUser : {
                fullname : dataUser.fullname,
                email : dataUser.email
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    
        
    }
}

exports.updateUser = async (req, res) => {
    try {

        const { id } = req.params
        const data = req.body
        await user.update(data, {
            where  : {
                id
            }
        })

        res.send({
            status: "success",
            message : `update user by id: ${id} success` 

        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addUsers = async (req,res) => {
    try {

        const data = req.body
        const dataUser = await user.create(data)

        res.send({
            status:"success",
            message: "Add User success",
            data: {
                dataUser
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const { id } = req.params
        await user.destroy({
            where : {
                id
            }
        })

        res.send({
            status:"success",
            message:`Delete user id: ${id} success`,
            data: {
                id
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}