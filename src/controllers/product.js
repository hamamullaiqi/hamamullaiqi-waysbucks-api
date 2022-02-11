const { product } = require("../../models")

exports.getProducts = async (req, res) => {
    try {
        const data = await product.findAll({
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })

        res.send({
            status : "success",
            data : {
                products : 
                    data,
                
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

exports.getProduct = async (req, res) => {
    try {

        const { id } = req.params
        const data = await product.findOne({
            where : {
                id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })

        res.send({
            status : "success",
            message : `Product by id : ${id} `,
            data : {
                products : 
                    data,
                
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