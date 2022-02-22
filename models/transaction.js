'use strict';
const {
  Model
} = require('sequelize');
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
        as: "buyer",
        foreignKey: {
          name: "id_user",
        },
      });

      transaction.hasMany(models.order_list, {
        as: "order",
        foreignKey: {
          name: "id_order",
        },
      });



    }
  }
  transaction.init({
    id_user: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total_pay: DataTypes.INTEGER,
    attch_transaction: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    poscode: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};