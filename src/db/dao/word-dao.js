const {
	WordModel,
	BookModel,
	BookCaseModel,
} = require('../schemas/word-schema');

class WordDAO {
	async findOneById({ short_id: id }) {
		// console.log('DAO : ' + { short_id: id })
		const word = await WordModel.findOne({ short_id: id });
		return word;
	}

	async findAll() {
		const word = await WordModel.find({});
		return word;
	}

	async createOne(params) {
		const { english, korean, pronounce, description } = params;
		const word = await WordModel.create({
			english,
			korean,
			pronounce,
			description,
		});
		return word;
	}

	async createMany(params) {
		const word = await WordModel.insertMany(params);
		return word;
	}

	async updateOne(find, update) {
		const word = await WordModel.findOneAndUpdate(find, update);
		return word;
	}

	async deleteOne(params) {
		const word = await WordModel.findOneAndDelete(params);
		return word;
	}

	async deleteAll() {
		const word = await WordModel.deleteMany({});
		return word;
	}
}

class BookDAO {
	async findById() {}
	async findAll() {}
	async createOne() {}
	async createMany() {}
	async updateOne() {}
	async deleteOne() {}
	async deleteAll() {}
}

class BookCaseDAO {
	async findById() {}
	async findAll() {}
	async createOne() {}
	async createMany() {}
	async updateOne() {}
	async deleteOne() {}
	async deleteAll() {}
}

const wordDAO = new WordDAO();
const bookDAO = new BookDAO();
const bookCaseDAO = new BookCaseDAO();

module.exports = { wordDAO, bookDAO, bookCaseDAO };
