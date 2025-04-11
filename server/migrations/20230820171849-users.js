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
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};