const { Router } = require('express');
const { wordService } = require('../services/word-service');
const { asyncHandler } = require('../middlewares/async-handler');

const wordRouter = Router();

wordRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		/**단어장에 속해 있는 단어 찾기 */
		if (Object.keys(req.query).length > 0) {
			const wordsByBook = await wordService.findWordsByBook(req.query.books);
			res.status(200).json(wordsByBook);
		} else {
			/**db에 있는 모든 단어 찾기 */
			const result = await wordService.findAll();
			res.status(200).json(result);
		}
	}),
);

wordRouter.get(
	'/:id',
	asyncHandler(async (req, res) => {
		console.log(req.params.id);
		const { id } = req.params;
		const result = await wordService.findOneById({ short_id: id });
		res.status(200).json(result);
	}),
);

wordRouter.post(
	'/',
	asyncHandler(async (req, res) => {
		const newWord = req.body;
		/**word form 안에 사용자가
		 * english, korean, pronounce, description 을 담아보내야합니다. */
		const result = await wordService.createOne(newWord);
		console.log(result);
		res.status(200).json(result);
	}),
);

wordRouter.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const result = await wordService.deleteOne({ short_id: id });
		console.log(result);
		res.status(204).json('삭제 성공');
	}),
);

wordRouter.put(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const updatedWord = req.body.word;
		const result = await wordService.updateOne({ short_id: id }, updatedWord);
		res.status(200).json(result);
	}),
);

module.exports = { wordRouter };
