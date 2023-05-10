const { wordDAO } = require('../db/dao/word-dao');

class WordService {
	async findOneById({ short_id: id }) {
		const word = await wordDAO.findOneById({ short_id: id });
		if (!word) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return word;
	}

	async findAll() {
		const words = await wordDAO.findAll();
		if (!words) {
			const err = new Error('단어들을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async createOne(params) {
		const word = await wordDAO.createOne(params);
		if (!word) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return word;
	}

	async createMany(params) {
		const words = await wordDAO.createMany(params);
		if (!words) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return words;
	}

	async updateOne(find, update) {
		const word = await wordDAO.updateOne(find, update);
		if (!word) {
			const err = new Error('단어를 수정하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return word;
	}

	async deleteOne(params) {
		const word = await wordDAO.deleteOne(params);
		if (!word) {
			const err = new Error('단어를 삭제하지 못했습니다.');
			err.status = 500;
			throw err;
		}
		return word;
	}

	async deleteAll() {
		const words = await wordDAO.deleteAll({});
		if (!words) {
			const err = new Error('단어를 삭제하지 못했습니다.');
			err.status = 500;
			throw err;
		}
		return words;
	}
}

const wordService = new WordService();
module.exports = { wordService };
