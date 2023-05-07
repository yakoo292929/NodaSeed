const mongoose = require('mongoose');
const stocks = require('./stocks');
const Stock = require('../models/stock');
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
// 在庫 Stock Seedデータ作成
////////////////////////////////////////////////
const seedDB = async () => {

  // DBクリア
  await Stock.deleteMany({});
  for (let i = 0; i < 123; i++ ) {
      const stock = new Stock({
        largeclassname: `${stocks[i].largeclassname}`,
        middleclassname: `${stocks[i].middleclassname}`,
        locationname: `${stocks[i].locationname}`,
        productname: `${stocks[i].productname}`,
        inventoryunitprice: `${stocks[i].inventoryunitprice}`,
        inventoryquantity: `${stocks[i].inventoryquantity}`,
        stockprice: `${stocks[i].stockprice}`,
        author:'64563c483907274898196202',
      });
      await stock.save();
  }
}

seedDB().then(() =>{
  mongoose.connection.close();
});
