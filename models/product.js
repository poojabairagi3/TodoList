const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
});

module.exports = Product;