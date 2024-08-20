"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          name: "Alif",
          identityNumber: "A1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alia",
          identityNumber: "A2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Deny",
          identityNumber: "A3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fisel",
          identityNumber: "A4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rangga",
          identityNumber: "A5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sandy",
          identityNumber: "A6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sodron",
          identityNumber: "A7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Freya",
          identityNumber: "A8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gibran",
          identityNumber: "A9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Windy",
          identityNumber: "A10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Employees", null, {});
  },
};
