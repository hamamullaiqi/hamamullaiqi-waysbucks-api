const { status } = require("express/lib/response");
const { transaction, order_transaction, order_list,order_topping, product, topping } = require("../../models");



exports.getOrderTransaction = async (req, res) => {
    try {
        
        const { id } = req.params

        const dataTransaction = await order_transaction.findAll({
            where: {
                id_user : id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            },
        
        })

           let idOrder =  dataTransaction.map(item =>{
                return item.id_orders
           } )



                let orderList = await order_list.findAll({
                    where: {
                        id_user : id,
                        id : idOrder
                    },
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "id_user", "id_product", "id_topping"]
                    },
                
                    include : [ 
                    // {
                    //     model: user,
                    //     as: "buyer",
                    //     attributes : {
                    //         exclude : ["createdAt", "updatedAt", "password", "status"]
                    //     }
                    // },
                    {
                        model: product,
                        as: "product",
                        attributes : {
                            exclude : ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: topping,
                        as: "toppings",
                        throught: {
                        model: order_topping,
                        as: "bridge",
                        attributes: {
                            exclude : ["createdAt", "updatedAt"]

                        }
                        },
                        attributes: {
                        exclude: ["createdAt", "updatedAt",],
                        },
                    }
                ],
            })
                



            orderList = JSON.parse(JSON.stringify(orderList));

            orderList = orderList.map((item) => {
            return {
                ...item,
                product: {
                ...item.product,
                image: process.env.FILE_PATH + item.product.image,
                },
            };
            });
           

    // orderList = JSON.parse(JSON.stringify(orderList));

    // orderList = orderList.map((item) => {
    //   return {
    //     ...item,
    //     product: {
    //       ...item.product,
    //       image: process.env.FILE_PATH + item.product.image,
    //     },
    //   };
    // });

       
        // if(orderList == "")
        // return res.status(404).send({
        //     message : "You Dont Have Orders"
        // })
        

        
        res.send({
            status : "success",
            data : {
                dataTransaction,
                orderList
                
            },
            
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {
        
        const { id } = req.params

        const dataTransaction = await transaction.findAll({
            where: {
                id_user : id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            },
        
        })

           

        
        res.send({
            status : "success",
            data : {
                dataTransaction,
               
                
            },
            
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
exports.addTransation = async (req, res) => {

    try {

        const {id} =req.user

        console.log(id);


        let dataCreate = req.body
        
        let newTransaction = await transaction.create({
            ...dataCreate,
            id_user : id,
            attch_transaction : req.file.filename,
            status: "pending accept"
 
        }) 

        JSON.parse(dataCreate.id_orders).map(async (item) => {
            

            const idOrder = item
            console.log(item);

            
            const idTransaction = newTransaction.id

             const transactionOrder = await order_transaction.create({
                    id_user : id,
                    id_orders : idOrder,
                    id_transaction : idTransaction, 
                    
                })
  
            
        })
        
            newTransaction = JSON.parse(JSON.stringify(newTransaction))

            newTransaction = {
            ...newTransaction,
            attch_transaction : process.env.FILE_PATH + newTransaction.attch_transaction
        }

     
           
        res.send({
            status: 'success',
            data: {
                
                newTransaction
                
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

