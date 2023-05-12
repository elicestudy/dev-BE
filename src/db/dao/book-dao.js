const { BookModel } = require('../schemas/book-schema');

class BookDAO {
	async findOneById({ short_id: id }) {
		const book = await BookModel.find({ short_id: id });
		return book;
	}

	async findAll() {
		const books = await BookModel.find({});
		return books;
	}

	async createOne(params) {
		const book = await BookModel.create(params);
		return book;
	}

	async createMany(params) {
		const books = await BookModel.create(params);
		return books;
	}

	async updateOne(find, update) {
		const book = await BookModel.findOneAndUpdate(find, update);
		return book;
	}

	async deleteOne(params) {
		const book = await BookModel.findOneAndDelete(params);
		return book;
	}

	async deleteAll() {
		const books = await BookModel.deleteAll({});
		return books;
	}
}

const bookDAO = new BookDAO();
module.exports = { bookDAO };
