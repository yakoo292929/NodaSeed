// 開発環境の場合
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');

const largeclassRoutes = require('./routes/largeclasses');
const middleclassRoutes = require('./routes/middleclasses');
const locationRoutes = require('./routes/locations');
const productRoutes = require('./routes/products');
const stockRoutes = require('./routes/stocks');
const userRoutes = require('./routes/users');

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
// ミドルウェア
////////////////////////////////////////////////
app.engine('ejs', ejsMate);  // ejs設定
app.set('views', path.join(__dirname, 'views'));  // views path
app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // 静的 public path
app.use(mongoSanitize());  // MongoDBインジェクション対策

const secret = process.env.SECRET || 'mysecret'

// セッションストア設定
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret
  },
  touchAfter: 24 * 3600   // 24時間
});
store.on('error', e => {
  console.log('セッションストアエラー', e);
});


// セッション設定
const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,                   // http経由でしかアクセスできない
    maxAge: 1000 * 60 * 60 * 24 * 7,  // 1週間
    // secure: true,                  // httpsでしか動作しない
  }
};
app.use(session(sessionConfig));

// パスポート設定(記述は必ずsession設定の後)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// フラッシュ設定
app.use(flash());

// ヘルメット設定
app.use(helmet());

// コンテンツ取得許可
const scriptSrcUrls = [
  'https://cdn.jsdelivr.net',
  'https://code.jquery.com/jquery-3.6.0.min.js'
];
const styleSrcUrls = [
  'https://cdn.jsdelivr.net',
];
const connectSrcUrls = [];
const fontSrcUrls = [];
const imgSrcUrls = [
  'https://images.unsplash.com'
];

// コンテンツ取得許可制御
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [],
    connectSrc: ["'self'", ...connectSrcUrls],
    scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
    styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
    workerSrc: ["'self'", "blob:"],
    childSrc: ["blob:"],
    objectSrc: [],
    imgSrc: ["'self'", 'blob:', 'data:', ...imgSrcUrls],
    fontSrc: ["'self'", ...fontSrcUrls]
  }
}));

// ローカル変数
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


////////////////////////////////////////////////
// ホーム  エンドポイント
////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.render('home');
});

////////////////////////////////////////////////
// ユーザー  エンドポイント
////////////////////////////////////////////////
app.use('/', userRoutes);

////////////////////////////////////////////////
// 大分類  エンドポイント
////////////////////////////////////////////////
app.use('/largeclasses', largeclassRoutes);

////////////////////////////////////////////////
// 中分類  エンドポイント
////////////////////////////////////////////////
app.use('/middleclasses', middleclassRoutes);

////////////////////////////////////////////////
// ロケーション  エンドポイント
////////////////////////////////////////////////
app.use('/locations', locationRoutes);

////////////////////////////////////////////////
// 商品  エンドポイント
////////////////////////////////////////////////
app.use('/products', productRoutes);

////////////////////////////////////////////////
// ユーザー保守  エンドポイント
////////////////////////////////////////////////
app.use('/users', userRoutes);

////////////////////////////////////////////////
// 在庫  エンドポイント
////////////////////////////////////////////////
app.use('/stocks', stockRoutes);

////////////////////////////////////////////////
// 全パターン
////////////////////////////////////////////////
app.all('*', (req, res, next) => {
  next(new ExpressError('ページがみつかりませんでした', 404));
});


////////////////////////////////////////////////
// エラー処理ミドル関数：最後に定義する
////////////////////////////////////////////////
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
      err.message = '問題が起きました!!';
  }
  res.status(statusCode).render('error', { err });
});


////////////////////////////////////////////////
// サーバー起動
////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`ポート${port}でリクエスト待受中...`);
});
