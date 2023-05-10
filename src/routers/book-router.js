const { Router } = require('express');
const { WordModel, BookModel, BookCaseModel } = require("../db/schemas/word-schema");
const { bookService } = require('../services/word-service');
const bookRouter = Router();

bookRouter.get('/', async (req, res) => {
	const result = await BookModel.find({});
	res.json(result);
});

bookRouter.post('/', async (req, res) => {
	const newBook = req.body;
  console.log(newBook)
  const result =await BookModel.create(newBook);
	res.json(result);
});

bookRouter.get('/:id', async (req, res) => {
	console.log(req.params.id);
	const { id } = req.params;
	const result = await BookModel.find({ short_id: id });
	res.json(result);
});

bookRouter.post('/', async (req, res) => {
	const newBook = req.body.book;
	console.log(newWord);
	/**word form 안에 사용자가
	 * english, korean, pronounce, description 을 담아보내야합니다. */
	const result = await BookModel.createOne(newWord);
	console.log(result);
	res.json(result);
});

// bookRouter.delete('/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const result = await bookService.deleteOne({ short_id: id });
// 	console.log(result);
// 	res.json('삭제 성공');
// });

bookRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await BookModel.findOneAndDelete({ short_id: id });
  res.json(result);
})

bookRouter.put('/:id', async (req, res) => {
	const { id } = req.params;
  const updatedBook = req.body; // 포스트맨의 바디에 쓴게 오는거다
	const result = await BookModel.findOneAndUpdate({ short_id: id }, updatedBook);
	res.json(result);
});

bookRouter.put('/:currname', async (req, res) => {
	const { currname } = req.params;
  const updatedBook = req.body; // 포스트맨의 바디에 쓴게 오는거다
	const result = await BookModel.findOneAndUpdate({ name: currname }, updatedBook);
	res.json(result);
});

module.exports = { bookRouter };
