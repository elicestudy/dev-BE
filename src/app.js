const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const { wordRouter } = require('./routers/word-router');
const { meaningRouter } = require('./routers/meaning-router');
const { bookRouter } = require('./routers/book-router');
const { userRouter } = require('./routers/user-router');
const { authRouter } = require('./routers/auth-router');
const { searchRouter } = require('./routers/search-router');
const { errorHandler } = require('./middlewares/error-handler');
const { quizRouter } = require('./routers/quiz-router');

const DB_URL =
	process.env.MONGODB_URL || 'MongoDB 서버 주소가 설정되지 않았습니다.';

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error =>
	console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error),
);
db.once('connected', () =>
	console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL),
);

const corsOptions = {
  origin: ['https://ppvoca.vercel.app', 'https://ppvoca.yubinhome.com'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// CORS 에러 방지
app.use(cors(corsOptions));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// 라우팅
app.get('/', async (req, res) => {
	res.send('api 페이지 접속 성공');
});
app.use('/api/words', wordRouter);
app.use('/api/meanings', meaningRouter);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);
app.use('/api/quiz', quizRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`http://localhost:${process.env.PORT}`);
});

module.exports = { app };
