'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('book_info', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    class: DataTypes.STRING,
    pages: DataTypes.INTEGER
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};