'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_transaction.init({
    id_transaction: DataTypes.INTEGER,
    id_orders: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_transaction',
  });
  return order_transaction;
};