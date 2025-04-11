module.exports = {
  async up(db, client) {
    const bcryptHashPassword = process.env.ADMIN_PASSWORD_HASH;
    await db
      .collection("users")
      .insertMany([{
        "name": "Nick",
        "username": "admin",
        "email": "admin@gmail.com",
        "password": bcryptHashPassword,
        "role": "ADMIN"
    }]);
  },

  async down(db, client) {
    await db.collection('users').deleteMany({ "username": "admin" });
  }
};