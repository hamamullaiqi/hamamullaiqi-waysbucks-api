
const path = require("path")
const fs = require("fs")
const { error } = require("console")
const {order_detail} = require("../../models")

exports.getOrderDetails= async (req, res) => {

    
    try {
        const dataOrder = await order_detail.findAll({ 
            
            
            attributes : { 
                exclude : ["createdAt", "updatedAt", "userId"]
            },
            

        })

        if(dataOrder == "")
        return res.status(404).send({
            message : "Toping Not Found"
        })


        res.send({
            status : "success",
            data : {
                transactions : dataOrder
                    
                
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