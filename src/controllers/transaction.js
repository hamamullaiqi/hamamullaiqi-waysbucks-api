const { transaction, order_transaction, order_list } = require("../../models");




exports.addTransation = async (req, res) => {

    try {

        const {id} =req.user

        console.log(id);


        


        
        let dataCreate = req.body
        
        let newTransaction = await transaction.create({
            ...dataCreate,
            id_user : id,
            attch_transaction : req.file.filename
 
        }) 

        JSON.parse(dataCreate.id_orders).map(async (item) => {
            

            const idOrder = item
            console.log(item);

            
            const idTransaction = newTransaction.id

             const transactionOrder = await order_transaction.create({
                    id_orders : idOrder,
                    id_transaction : idTransaction, 
                    
                })
  
            
        })
        
            newTransaction = JSON.parse(JSON.stringify(newTransaction))

            newTransaction = {
            ...newTransaction,
            attch_transaction : process.env.FILE_PATH + newTransaction.attch_transaction
        }

        

        // let dataProducts = newTransaction.id_product.map( async (item) => {
        //     const idTransaction = newTransaction.id
        //     const idProduct = item

        //     await transaction_product.create({
        //         id_transaction : idTransaction,
        //         id_product : idProduct
        //     })

        //     let dataTopping = newTransaction.id_toppings.map( async (topping) => {
        //         const idTrsProducts = dataProducts.id
        //         const idTopping = topping

        //         await transaction_topping.create({
        //             id_trsproduct : idTrsProducts,
        //             id_toppings : idTopping
        //         })
        //     } )
        // })

        
        
        
            
        
           
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