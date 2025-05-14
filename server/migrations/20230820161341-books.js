const mongoose = require('mongoose');

module.exports = {
  async up(db, client) {
    await db
      .collection("books")
      .insertMany([{
        "_id": new mongoose.Types.ObjectId("647f2c9311da4d2da202dd77"),
        "title": "Clean Code",
        "author": new mongoose.Types.ObjectId("647e13103c18faca7f185cc0"),
        "category": new mongoose.Types.ObjectId("647f04587957d0d366afa4a4"),
        "publishedDate": "4 September. 2018"
      },{
        "_id": new mongoose.Types.ObjectId("647f2c9311da4d2da202dd78"),
        "title": "Design Patterns",
        "author": new mongoose.Types.ObjectId("647e13103c18faca7f185cbe"),
        "category": new mongoose.Types.ObjectId("647f04587957d0d366afa4a4"),
        "publishedDate": "4 September. 2018"
      },{
        "_id": new mongoose.Types.ObjectId("647f2c9311da4d2da202dd79"),
        "title": "Smart Contract Security",
        "author": new mongoose.Types.ObjectId("647e13103c18faca7f185cc1"),
        "category": new mongoose.Types.ObjectId("647f04587957d0d366afa4a8"),
        "publishedDate": "12 December. 2018"
      }]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};