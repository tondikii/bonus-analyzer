'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Performances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PerformanceReportId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "PerformanceReports", key: "id"},
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      EmployeeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Employees", key: "id"},
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      finalScore: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Performances');
  }
};