'use strict';
const {
  Model
} = require('sequelize');
const order_detail = require('./order_detail');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      transaction.belongsTo(models.order_detail, {
        as: "order",
        foreignKey: {
          name: "orderId",
        },
      });
    }
  }
  transaction.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total_payment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};