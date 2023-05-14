const { Router } = require('express');

const { WordModel } = require('../db/schemas/word-schema');
const { BookModel } = require('../db/schemas/book-schema');
const { wordService } = require('../services/word-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');
const { wordMeaningService } = require('../services/wordMeaning-service');
const searchRouter = Router();

searchRouter.get(
	'/words',
	verifyToken,
	asyncHandler(async (req, res) => {
		// await WordModel
		const { userEmail } = req.user;
		console.log(req.query.word);
		const searchCondition = [
			{
				$search: {
					text: {
						query: req.query.word,
						path: 'word'
					}
				}
			},
			{
				$match: {
					ownerEmail: userEmail
				}
			},
			{
				$sort: {
					createdAt: -1
				}
			}
		];
		const result1 = await WordModel.aggregate(searchCondition);
		console.log('result1:', result1);

		// const result2 = await WordModel.find({ ownerEmail: userEmail, word: req.query.word });
		// console.log('result2:', result2);
		res.status(200).json({ result1 });

	})
);

searchRouter.get(
	'/books',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		console.log(req.query.name);
		const searchCondition = [
			{
				$search: {
					text: {
						query: req.query.name,
						path: "name"
					}
				}
			},
			{
				$match: {
					ownerEmail: userEmail
				}
			},
			{
				$sort: {
					createdAt: -1
				}
			}
		];
		const result1 = await BookModel.aggregate(searchCondition);
		console.log('result1:', result1);
		const result2 = await BookModel.find({ ownerEmail: userEmail, name: req.query.name });
		console.log('result2:', result2);
		res.status(200).json(result2);

	})
);


module.exports = { searchRouter };
