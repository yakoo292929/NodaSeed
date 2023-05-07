const mongoose = require('mongoose');
const largeclasses = require('./largeclasses');
const Largeclass = require('../models/largeclass');
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
// 大分類 Largeclass Seedデータ作成
////////////////////////////////////////////////
const seedDB = async () => {

  // DBクリア
  await Largeclass.deleteMany({});
  for (let i = 0; i < 2; i++ ) {
      const largeclass = new Largeclass({
        largeclassname: `${largeclasses[i].largeclassname}`,
        image: '',
        description: `${largeclasses[i].description}`,
        author:'64563c483907274898196202',
      });
      await largeclass.save();
  }
}

seedDB().then(() =>{
  mongoose.connection.close();
});
