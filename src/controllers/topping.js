const { topping } = require("../../models")
const path = require("path")
const fs = require("fs")

exports.getToppings = async (req, res) => {
    try {

        const dataToppings = await topping.findAll({
            attributes : {
                exclude : ["createdAt", "updateAt"]
            }
        })

        if(dataToppings == "")
        return res.status(404).send({
            message : "Toping Not Found"
        })


        res.send({
            status : "success",
            data : {
                topping : 
                    dataToppings,
                
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

exports.getTopping = async (req, res) => {
    try {

        const { id } = req.params

        const dataTopping = await topping.findOne({
            where : {
                id
            },
            attributes : {
                exclude : ["createdAt", "updateAt"]
            }
        })

        if(dataTopping == "")
        return res.status(404).send({
            message : "Toping Not Found"
        })


        res.send({
            status : "success",
            data : {
                toping : 
                    dataTopping,
                
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
exports.addTopping = async (req, res) => {

    try {

        const dataCreate = {
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename
        }

         

        let newTopping = await topping.create(dataCreate,{ 
            ...dataCreate
        }) 

        newTopping = JSON.parse(JSON.stringify(newTopping))

        newTopping = {
            title : req.body.title,
            price : req.body.price,
            image : process.env.FILE_PATH + newTopping.image
        }

        res.send({
            status: 'success',
            data: {
              newTopping
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
exports.updateTopping= async (req, res) => {
    try {

        const { id } = req.params
        const dataUpdate = {
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename
        }
        

         let updateTopping = await topping.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate,
            
        })

        updateTopping = JSON.parse(JSON.stringify(updateTopping))

        updateTopping = {
            ...dataUpdate,
            image : process.env.FILE_PATH + updateTopping.image
        }


        const data = await topping.findOne({
            where : {
                id
            },
            
            attributes : {
                exclude : ["updatedAt", "createdAt"]
            }
            
        }) 

        res.send({
            status : "success",
            message : `Update topping by id: ${id} success`,
            data : {
                Topping : data
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
exports.deleteTopping = async (req, res) => {

    try {
        const { id } = req.params
        const dataTopping = await topping.findOne({
            where : {
                id
            },
            
        }) 
        if(!dataTopping)
        return res.status(404).send({
            message : "Topping Not Found"
        })

        const removeImage = (filePath)=> {
            //menggabungkan direktori controller , uploads dan nama file Topping
            
            filePath = path.join(__dirname, "../../uploads", filePath)
            fs.unlink(filePath, err => console.log(err))
        }


        removeImage(dataTopping.image)

        
        

        

        const deleteData = await topping.destroy({
            where : {
                id,
                
            },
            
        })
        
       

        res.send({
            status : "seccess",
            message : `Delete Topping by id : ${id}`,
            data : {dataTopping}
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
        
    }

    
}