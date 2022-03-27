"use strict";

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

    const user = await queryInterface.rawSelect("Users", {}, ["id"]);

    if (!user)
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: 1,
            firstName: "admin",
            lastName: "admin",
            password:
              "$2a$10$hKkHWqq/0ua0cGArVuVhFOaQK1Y5dhdNpyRFNVbyF3e8SthkW.vtG",
            userName: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    const directoryPeople = await queryInterface.rawSelect(
      "DirectoryPeople",
      {},
      ["id"]
    );

    if (!directoryPeople)
      await queryInterface.bulkInsert(
        "DirectoryPeople",
        [
          {
            id: 1,
            firstName: "Veli",
            lastName: "Mehmet",
            corparation: "Şirket dsa A.Ş",
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            firstName: "Ali",
            lastName: "Veli",
            corparation: "Şirket Asd A.Ş",
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );

    const phones = await queryInterface.rawSelect("Phones", {}, ["id"]);

    if (!phones)
      await queryInterface.bulkInsert(
        "Phones",
        [
          {
            id: 1,
            phone: "5551234567",
            DirectoryPersonId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            phone: "5551234568",
            DirectoryPersonId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            phone: "5551234569",
            DirectoryPersonId: 2,
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
     * await queryInterface.bulkDelete('People', new Date(), {});
     */
  },
};
