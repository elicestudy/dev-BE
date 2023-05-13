const { Router } = require('express');
const { wordService } = require('../services/word-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');
const { wordMeaningService } = require('../services/wordMeaning-service');
const wordRouter = Router();

wordRouter.get(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		if (Object.keys(req.query).length > 0) {
			const wordsByBook = await wordService.findWordsByBook(
				userEmail,
				req.query.bookId,
			);
			res.status(200).json(wordsByBook);
		} else {
			/**db에 있는 모든 단어 찾기 */
			const result = await wordService.findAllWordsOfThisUser(userEmail);
			res.status(200).json(result);
		}
	}),
);

wordRouter.get(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { ownerEmail: userEmail, short_id: id };
		const result = await wordService.findOneById(clue);
		res.status(200).json(result);
	}),
);

wordRouter.post(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		/**배열로 여러개 생성하려한다면 */
		if (Array.isArray(req.body)) {
			const newWordsArray = req.body;
			const promises = newWordsArray.map(async (word, index) => {
				return new Promise((resolve, reject) => {
					setTimeout(async () => {
						try {
							const meanings = await wordMeaningService.getWordMeanings(
								word.lang,
								word.word,
							);
							word.ownerEmail = userEmail;
							word.meanings = meanings;
							console.log(word);
							resolve(word);
						} catch (err) {
							console.log(
								`Error occurred while fetching the meanings for ${word.word}: ${err.message}`,
							);
							resolve(null);
						}
					}, index * 500); // 각 요청 사이의 지연 시간을 인덱스 값에 따라 설정
				});
			});
			Promise.all(promises)
				.then(results => {
					const filteredWords = results.filter(word => word !== null);
					return wordService.createMany(filteredWords);
				})
				.then(result => {
					res.status(200).json(result);
				})
				.catch(err => {
					console.log(`Error occurred: ${err.message}`);
					res.status(500).json({ message: 'Internal server error' });
				});
		} else {
			/**하나만 생성하려한다면 */
			const { lang, word } = req.body;
			const meanings = await wordMeaningService.getWordMeanings(lang, word);
			const newWord = req.body;
			newWord.ownerEmail = userEmail;
			newWord.meanings = meanings;
			const result = await wordService.createOne(newWord);
			console.log(result);
			res.status(200).json(result);
		}
	}),
);
wordRouter.delete(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { ownerEmail: userEmail, short_id: id };
		const result = await wordService.deleteOne(clue);
		res.status(204).json('삭제 성공');
	}),
);

wordRouter.put(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { short_id: id, ownerEmail: userEmail };
		const updatedWord = { ...req.body };
		// console.log('router', clue);
		const result = await wordService.updateOne(clue, updatedWord);
		res.status(200).json(result);
	}),
);

module.exports = { wordRouter };
