const { bookDAO } = require('../db/dao/book-dao');

class BookService {
	async findOneById({ short_id: id }) {
		const book = await bookDAO.findOneById({ short_id: id });
		return book;
	}

	async findAll() {
		console.log("service 에 도착했어용");
		const books = await bookDAO.findAll();
		return books;
	}

	async createOne(params) {
		const book = await bookDAO.createOne(params);

		return book;
	}

	async createMany(params) {
		const books = await bookDAO.createMany(params);
		return books;
	}

	async updateOne(find, update) {
		const book = await bookDAO.updateOne(find, update);
		return book;
	}

	async deleteOne(params) {
		const book = await bookDAO.deleteOne(params);
		return book;
	}

	async deleteAll() {
		const books = await bookDAO.deleteAll({});
		return books;
	}
}

const bookService = new BookService();
module.exports = { bookService };
