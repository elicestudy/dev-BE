const { wordDAO } = require('../db/dao/word-dao');
const { BookModel } = require('../db/schemas/book-schema');

class WordService {
	async findWordsByBook(userEmail, books) {
		const words = await wordDAO.findWordsByBook(userEmail, books);
		if (!words) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async findOneById(clue) {
		const word = await wordDAO.findOneById(clue);
		console.log(clue);
		if (!word) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return word;
	}

	async findAllWordsOfThisUser(userEmail) {
		const words = await wordDAO.findAll(userEmail);
		if (!words) {
			const err = new Error('단어들을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async createOne(params) {
		/** 없는 단어장을 기재하여 추가하려한다면 에러 반환 */
		const existingBook = await BookModel.find({
			bookId: params.book,
			ownerEmail: params.ownerEmail,
		});
		if (!existingBook) {
			const err = new Error('해당 단어장이 존재하지 않습니다.');
			err.status = 422;
			throw err;
		}
		const word = await wordDAO.createOne(params);
		/** 잘못된 요청을 받았다면 */
		if (!word) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return word;
	}

	async createMany(params) {
		/** 없는 단어장을 기재하여 추가하려한다면 에러 반환 */
		params.forEach(async word => {
			const existingBook = await BookModel.find({
				name: word.book,
				ownerEmail: word.ownerEmail,
			});
			//추후 bookDAO 나 BookService로 수정 필요
			if (!existingBook) {
				const err = new Error('해당 단어장이 존재하지 않습니다.');
				err.status = 422;
				throw err;
			}
		});
		const words = await wordDAO.createMany(params);
		/** 잘못된 요청을 받았다면 */
		if (!words) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return words;
	}

	async updateOne(clue, update) {
		/** 수정할 단어의 전체 정보 */
		const currWord = await wordDAO.findOneById(clue);
		/** 해당 유저가 가진 단어장이 맞는지 */
		//추후 bookDAO 나 BookService로 수정 
		const thisBook = await BookModel.findOne({
			ownerEmail: currWord.ownerEmail,
			short_id: currWord.bookId
		});
		/** 없는 단어장을 기재하여 추가하려한다면 */
		if (!thisBook) {
			const err = new Error('해당 단어장이 존재하지 않습니다.');
			err.status = 422;
			throw err;
		}
		/** 잘못된 요청을 받았다면 */
		if (currWord.ownerEmail === clue.ownerEmail) {
			const newWord = await wordDAO.updateOne(clue, update);
			if (!newWord) {
				const err = new Error('단어를 수정하지 못했습니다.');
				err.status = 422;
				throw err;
			}
			return newWord;
		}
	}

	async deleteOne(clue) {
		/** 삭제할 단어의 ownerEmail과 clue의 ownerEmail이 동일한지 검증 */
		const currWord = await wordDAO.findOneById(clue);
		if (currWord.ownerEmail === clue.ownerEmail) {
			const word = await wordDAO.deleteOne(clue);
			if (!word) {
				const err = new Error('단어를 삭제하지 못했습니다.');
				err.status = 500;
				throw err;
			}
			return word;
		}
	}

	async deleteAll() {
		/** 삭제할 단어의 ownerEmail과 clue의 ownerEmail이 동일한지 검증 */
		const currWord = await wordDAO.findOneById(clue);
		if (currWord.ownerEmail === clue.ownerEmail) {
			const words = await wordDAO.deleteAll({});
			if (!words) {
				const err = new Error('단어를 삭제하지 못했습니다.');
				err.status = 500;
				throw err;
			}
			return words;
		}
	}
}

const wordService = new WordService();
module.exports = { wordService };
