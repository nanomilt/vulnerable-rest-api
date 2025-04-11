module.exports = {
  async up(db, client) {
    await db
      .collection("users")
      .insertMany([{
        "name": "Nick",
        "username": "admin",
        "email": "admin@gmail.com",
        "password": process.env.ADMIN_PASSWORD_HASH, // Use environment variable for sensitive data
        "role": "ADMIN"
    }]);
  },

  async down(db, client) {
    // This function does not have any unused variables
  }
};