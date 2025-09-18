module.exports = {
  async up(db, client) {
    const bcrypt = require('bcrypt');
    const saltRounds = process.env.SALT_ROUNDS || 10;
    const hashedPassword = await bcrypt.hash('changeme', saltRounds);

    await db
      .collection('users')
      .insertMany([{
        'name': 'Nick',
        'username': 'admin',
        'email': 'admin@gmail.com',
        'password': hashedPassword,
        'role': 'ADMIN',
      }]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
