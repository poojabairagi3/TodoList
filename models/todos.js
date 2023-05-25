const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Todos = sequelize.define('todos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  todos: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isdone:{
    type:Sequelize.BOOLEAN,
    default:false
  }
  
});

module.exports = Todos;