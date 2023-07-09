'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contents', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
      nameRu: { type: Sequelize.STRING, unique: true },
      nameEn: { type: Sequelize.STRING, unique: true },
      posterUrl: { type: Sequelize.STRING },
      posterUrlPreview: { type: Sequelize.STRING },
      filmId: { type: Sequelize.INTEGER },
      year: { type: Sequelize.STRING },
      genres: { type: Sequelize.JSONB },
      countries: { type: Sequelize.JSONB },
      rating: { type: Sequelize.STRING },
      ratingVoteCount: { type: Sequelize.INTEGER },
      ratingChange: { type: Sequelize.STRING },
      filmLength: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contents');
  }
};
