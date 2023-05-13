const { Router } = require('express');
const { asyncHandler } = require('../middlewares/async-handler');
const { wordMeaningService } = require('../services/wordMeaning-service');

const wordMeaningRouter = Router();

wordMeaningRouter.get(
	'/:word',
	asyncHandler(async (req, res) => {
		const { word } = req.params;
		const { lang } = req.body;
		const meanings = await wordMeaningService.getWordMeanings(lang, word);
		console.log(meanings)
		res.json(meanings);
	}),
);

module.exports = { wordMeaningRouter };
