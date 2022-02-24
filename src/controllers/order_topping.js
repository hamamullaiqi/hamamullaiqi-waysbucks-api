
const { JSON } = require("sequelize")
const { order_topping } = require("../../models")




exports.getOrderToppings = async (req, res) => {
    const path = process.env.PATH_FILE;

    try {

        const { id } = req
        
        
        res.send({
            status: 'success',
            data: {
                
                
                dataCreate
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