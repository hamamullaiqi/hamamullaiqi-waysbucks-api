'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          as : "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "order_details",
          as : "order_detail",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        
      },
      status: {
        type: Sequelize.STRING
      },
      total_payment: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};