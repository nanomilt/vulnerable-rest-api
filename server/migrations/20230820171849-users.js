module.exports = {
  async up(db, client) {
    await db
      .collection("users")
      .insertMany([{
        "name": "Nick",
        "username": "admin",
        "email": "admin@gmail.com",
        "password": process.env.ADMIN_PASSWORD_HASH, // Use environment variable for password hash
        "role": "ADMIN"
    }]);
  },

  async down(db, client) {
  }
};