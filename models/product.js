'use strict';
const {
  Model
} = require('sequelize');
const order_detail = require('./order_detail');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      product.hasMany(models.order_detail, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });
        

      
    }
  }
  product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};