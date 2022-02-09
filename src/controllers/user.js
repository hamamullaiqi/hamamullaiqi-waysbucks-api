const {user} = require("../../models")


exports.getUsers = async (req,res) => {
    try {

        const users = await user.findAll()

        res.send({
            status:"success",
            data: {
                users
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