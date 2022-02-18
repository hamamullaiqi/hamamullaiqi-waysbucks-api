'use strict';
const {
  Model
} = require('sequelize');
const transaction = require('./transaction');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_detail.hasMany(models.transaction, {
        as: "order",
        foreignKey: {
          name: "orderId",
        },
      });
      order_detail.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });
      
      
    }
  }
  order_detail.init({
    
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    toppingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};