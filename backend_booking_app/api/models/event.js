'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.User,{
        as:'user',
        foreignKey:'username'
      })
    }
  }
  Event.init({
    username: DataTypes.STRING,
    eventId: {type:DataTypes.STRING,primaryKey:true, defaultValue:DataTypes.UUIDV4},
    scheduledTime: DataTypes.DATE,
    scheduledLat: DataTypes.INTEGER,
    scheduledLong: DataTypes.INTEGER,
    title: DataTypes.STRING,
    about: DataTypes.STRING,
    minimumBid: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};