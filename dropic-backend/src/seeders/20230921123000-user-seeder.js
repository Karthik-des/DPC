"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        email: "admin@dropic.com",
        password: "$2b$10$WzLqk7WZOb5n/BCoO9gGAu7AP2e1gN9mVOimxkpA4oMUT8ap3pR1S", // hashed: 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Test User",
        email: "test@dropic.com",
        password: "$2b$10$QOqCwz6dPbH1hP2YQDPVce4q.RJhXxdp4X7z0XhAql7bP5K/NuvKu", // hashed: password
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
