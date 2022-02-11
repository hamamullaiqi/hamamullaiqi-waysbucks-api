const { product } = require("../../models")

exports.getProducts = async (req, res) => {
    try {
        const data = await product.findAll({
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })

        // data = JSON.parse(JSON.stringify(data))

        // data = data.map((item) => {
        //     return {
        //         ...item,
        //         image: process.env.FILE_PATH + item.image
        //     }
        // })

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

exports.addProduct = async (req, res) => {

    try {

         

        let newProduct = await product.create({
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename,
        }) 

        newProduct = JSON.parse(JSON.stringify(newProduct))

        newProduct = {
            title : req.body.title,
            price : req.body.price,
            image : process.env.FILE_PATH + newProduct.image
        }

        res.send({
            status: 'success',
            data: {
              newProduct
            }
      
          })

        
      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
        
}

exports.deleteProduct = async (req, res) => {

    try {
        const { id } = req.params

        const data = await product.destroy({
            where : {
                id
            }
        })

        res.send({
            status : "seccess",
            message : `Delete Product by id : ${id}`
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
        
    }

    
}
