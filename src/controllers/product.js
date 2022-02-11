const { product } = require("../../models")
const path = require("path")
const fs = require("fs")
const { error } = require("console")

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

        const dataCreate = {
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename
        }

         

        let newProduct = await product.create(dataCreate,{ 
            ...dataCreate
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

exports.updateProduct= async (req, res) => {
    try {

        const { id } = req.params
        const dataUpdate = {
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename
        }
        

         let updateProduct = await product.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate,
            
        })

        updateProduct = JSON.parse(JSON.stringify(updateProduct))

        updateProduct = {
            ...dataUpdate,
            image : process.env.FILE_PATH + updateProduct.image
        }


        const data = await product.findOne({
            where : {
                id
            },
            
            attributes : {
                exclude : ["updatedAt", "createdAt"]
            }
            
        }) 

        res.send({
            status : "success",
            message : `Update product by id: ${id} success`,
            data : {
                product : data
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
        const data = await product.findOne({
            where : {
                id
            },
            
        }) 
        if(!data)
        return res.status(404).send({
            message : "Product Not Found"
        })

        const removeImage = (filePath)=> {
            //menggabungkan direktori controller , uploads dan nama file product
            
            filePath = path.join(__dirname, "../../uploads", filePath)
            fs.unlink(filePath, err => console.log(err))
        }


        removeImage(data.image)

        
        

        

        const deleteData = await product.destroy({
            where : {
                id,
                
            },
            
        })
        
       

        res.send({
            status : "seccess",
            message : `Delete Product by id : ${id}`,
            data : {data}
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
        
    }

    
}
