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
			newWordsArray.forEach(word => {
				word.ownerEmail = userEmail;
			});
			const result = await wordService.createMany(newWordsArray);
			res.status(200).json(result);
		} else {
			/**하나만 생성하려한다면 */
			const newWord = req.body;
			newWord.ownerEmail = userEmail;
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
