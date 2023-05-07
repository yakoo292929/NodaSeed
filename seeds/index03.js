const mongoose = require('mongoose');
const locations = require('./locations');
const Location = require('../models/location');
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/noda-seed';

////////////////////////////////////////////////
// mongoose -> mongoDB接続
////////////////////////////////////////////////
mongoose.connect(dbUrl,
 { useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
 })
  .then(() => {
    console.log('MongoDBコネクションOK!!!');
  })
  .catch(err => {
    console.log(err);
    console.log('MongoDBコネクションエラー!!!');
  });


////////////////////////////////////////////////
// ロケーション Location Seedデータ作成
////////////////////////////////////////////////
const seedDB = async () => {

  // DBクリア
  await Location.deleteMany({});
  for (let i = 0; i < 7; i++ ) {
      const location = new Location({
        locationname: `${locations[i].locationname}`,
        description: `${locations[i].description}`,
        image: '',
        author:'64563c483907274898196202',
      });
      await location.save();
  }
}

seedDB().then(() =>{
  mongoose.connection.close();
});
