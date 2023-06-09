const { BookModel } = require('../schemas/book-schema');

class BookDAO {
	async findOneById({ short_id: id }) {
		const book = await BookModel.find({ short_id: id });
		return book;
	}

	async findAllByUser(userEmail) {
		const books = await BookModel.find({ ownerEmail: userEmail });
		return books;
	}

	async findOneByUserAndId(userEmail, bookId) {
		const book = await BookModel.find({
			ownerEmail: userEmail,
			short_id: bookId,
		});
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

	async updateOneByUserAndId(find, update) {
		const book = await BookModel.findOneAndUpdate(find, update, { new: true });
		return book;
	}

	async deleteOneByUserAndId(params) {
		const book = await BookModel.findOneAndDelete(params.short_id);
		return book;
	}

	async deleteAll() {
		const books = await BookModel.deleteMany({});
		return books;
	}
	async createSample(params) {
		const books = await BookModel.create(params);
		return books;
	}
}

const bookDAO = new BookDAO();
module.exports = { bookDAO };
