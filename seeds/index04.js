const mongoose = require('mongoose');
const products = require('./products');
const Product = require('../models/product');
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
// 商品 Product Seedデータ作成
////////////////////////////////////////////////
const seedDB = async () => {

  // DBクリア
  await Product.deleteMany({});
  for (let i = 0; i < 350; i++ ) {
      const product = new Product({
        largeclassname: `${products[i].largeclassname}`,
        middleclassname: `${products[i].middleclassname}`,
        productname: `${products[i].productname}`,
        inventoryunitprice: `${products[i].inventoryunitprice}`,
        unitsellingprice: `${products[i].unitsellingprice}`,
        image: '',
        description: `${products[i].description}`,
        author:'64563c483907274898196202',
      });
      await product.save();
  }
}

seedDB().then(() =>{
  mongoose.connection.close();
});
