const { Router } = require('express');
const { WordModel } = require('../db/schemas/word-schema');
const { BookModel } = require('../db/schemas/book-schema');
const { wordService } = require('../services/word-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');
const searchRouter = Router();

searchRouter.get(
	'/words',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const result = await WordModel.find({ ownerEmail: userEmail, word: req.query.word });
		res.status(200).json(result);
	})
);

searchRouter.get(
	'/books',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const result = await BookModel.find({ ownerEmail: userEmail, name: req.query.name });
		res.status(200).json(result);
	})
);


module.exports = { searchRouter };
