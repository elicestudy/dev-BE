const { WordModel } = require('../schemas/word-schema');

class WordDAO {
	/**단어장에 따라 단어찾기 */
	async findWordsByBook(userEmail, books) {
		const words = await WordModel.find({ ownerEmail: userEmail, book: books });
		return words;
	}

	async findOneById(clue) {
		const word = await WordModel.findOne(clue);
		return word;
	}

	async findAll(userEmail, status) {
		const query = { ownerEmail: userEmail };
		if (status) {
			query.status = status;
		}
		const words = await WordModel.find(query);
		return words;
	}

	async createOne(params) {
		const word = await WordModel.create(params);
		return word;
	}

	async createMany(params) {
		const word = await WordModel.insertMany(params);
		return word;
	}

	async updateOne(clue, update) {
		const word = await WordModel.findOneAndUpdate(clue.short_id, update, {
			new: true,
		});
		return word;
	}

	async deleteOne(clue) {
		const word = await WordModel.findOneAndDelete(clue);
		return word;
	}

	async deleteAll() {
		const word = await WordModel.deleteMany({});
		return word;
	}
}

const wordDAO = new WordDAO();

module.exports = { wordDAO };
