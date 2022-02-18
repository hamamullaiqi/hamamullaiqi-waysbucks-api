const { transaction, user, order_detail, product } = require("../../models")
const path = require("path")
const fs = require("fs")
const { error } = require("console")



exports.getTransactions= async (req, res) => {

    
    try {

        const { id } = req.params
        const userId = await user.findOne({
            where : {
                id
            }
        })
        
        const dataTransactions = await transaction.findAll({ 
            where : {
                id
            },
           
            
            include : [
                {
                    model: user,
                    as: "user",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "password"]
                    }
                },
            
                {
                    model: order_detail,
                    as: "order",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "productId", "toppingId"]
                    },
                
                        include : 
                            { 
                                model: product,
                                as: "product",
                                attributes : {
                                    exclude : ["createdAt", "updatedAt"]
                                },
                            }
                            
                },
            ],
            attributes : { 
                exclude : ["createdAt", "updatedAt", "userId", "orderId"]
            },
            

        })

        if(dataTransactions == "")
        return res.status(404).send({
            message : "Toping Not Found"
        })


        res.send({
            status : "success",
            data : [
                {
                    dataTransactions

                    }]
                
            
            
            
           
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransaction= async (req, res) => {

    
    try {

        const { id } = req.params

        const dataTransaction = await transaction.findOne({ 
           where : {
               id
           },
            
            include : [
                {
                    model: user,
                    as: "user",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "password"]
                    }
                },
            
                {
                    model: order_detail,
                    as: "order",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "productId", "toppingId"]
                    },
                
                        include : 
                            { 
                                model: product,
                                as: "product",
                                attributes : {
                                    exclude : ["createdAt", "updatedAt"]
                                },
                            }
                            
                },
            ],
            attributes : { 
                exclude : ["createdAt", "updatedAt", "userId", "orderId"]
            },
            

        })

        if(dataTransaction == "")
        return res.status(404).send({
            message : "Toping Not Found"
        })


        res.send({
            status : "success",
            data : {
                id : dataTransaction.id,
                user : dataTransaction.user,
                order : dataTransaction.order
                    
                
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