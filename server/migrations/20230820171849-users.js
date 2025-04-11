module.exports = {
  async up(db, client) {
    await db
      .collection("users")
      .insertMany([{
        "name": "Nick",
        "username": "admin",
        "email": "admin@gmail.com",
        "password": process.env.ADMIN_PASSWORD_HASH,
        "role": "ADMIN"
    }]);
  },

  async down(db, client) {
    // No unused variables in this code
  }
};