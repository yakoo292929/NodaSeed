const mongoose = require('mongoose');
const middleclasses = require('./middleclasses');
const Middleclass = require('../models/middleclass');
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
// 中分類 Middleclass Seedデータ作成
////////////////////////////////////////////////
const seedDB = async () => {

  // DBクリア
  await Middleclass.deleteMany({});
  for (let i = 0; i < 53; i++ ) {
      const middleclass = new Middleclass({
        largeclassname: `${middleclasses[i].largeclassname}`,
        middleclassname: `${middleclasses[i].middleclassname}`,
        image: '',
        description: `${middleclasses[i].description}`,
        author:'64563c483907274898196202',
      });
      await middleclass.save();
  }
}

seedDB().then(() =>{
  mongoose.connection.close();
});
