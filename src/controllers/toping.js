const { toping } = require("../../models")
const patch = require("path")
const fs = require("fs")

exports.getTopings = async (req, res) => {
    try {

        const dataToping = await toping.findAll({
            attributes : {
                exclude : ["createdAt", "updateAt"]
            }
        })

        if(!dataToping)
        return res.status(404).send({
            message : "Toping Not Found"
        })


        res.send({
            status : "success",
            data : {
                toping : 
                    dataToping,
                
            },
            
           
        })
        
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
        
    }
}