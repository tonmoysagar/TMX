'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Users',
      'username',
      {
        type:Sequelize.STRING,
        unique: true
      }
    )
    await queryInterface.createTable('Events', {
      username: {
        type: Sequelize.STRING,
        references:{
          model:'Users',
          key:'username'
        },
        allowNull:false
      },
      eventId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        default:Sequelize.DataTypes.UUIDV4
      },
      scheduledTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      scheduledLat: {
        type: Sequelize.INTEGER
      },
      scheduledLong: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      minimumBid: {
        type: Sequelize.FLOAT,
        default:0
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
  async down(queryInterface) {
    await queryInterface.dropTable('Events');
  }
};