'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('book_info', [{
      id: 1,
      title: "Sezon Burz",
      author: "Andrzej Sapkowski",
      class: "Fantastyka",
      pages: 404
    },
    {
      id: 2,
      title: "Szachista",
      author: "Waldemar Lysiak",
      class: "Fikcja historyczna",
      pages: 336
    },
    {
      id: 3,
      title: "Dzien Szakala",
      author: "Frederick Forsyth",
      class: "Kryminal",
      pages: 352
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      //return queryInterface.bulkDelete('book_info', null, {});
  }
};
