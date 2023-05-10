const { model, Schema } = require('mongoose');
const { shortId } = require('../../utils/short-id');

/** 단어 스키마 */
const WordSchema = new Schema(
	{
		short_id: shortId,
		english: { type: String, required: true },
		korean: { type: String, required: true },
		pronounce: { type: String },
		description: { type: String },
	},
	{
		collection: 'Word',
		timestamps: true,
	},
);

/** 단어장 스키마 */
const BookSchema = new Schema(
	{
		short_id: shortId,
		name: { type: String, required: true },
		words: [WordSchema],
		description: { type: String },
		start_lang: {
			type: String,
			enum: ['english', 'korean'],
			default: 'english',
			required: true,
		},
		end_lang: {
			type: String,
			enum: ['english', 'korean'],
			default: 'korean',
			required: true,
		},
	},
	{
		collection: 'Book',
		timestamps: true,
	},
);

/** 책장 스키마 */
const BookCaseSchema = new Schema(
	{
		name: {
			type: [BookSchema],
			required: false,
		},
	},
	{
		collection: 'BookCase',
		timestamps: true,
	},
);

/** 단어, 단어장, 책장 모델 선언
 *  새로운 document를 생성하려 하면,
 *  아래 모델 클래스의 인스턴스로서 새로운 모델(mongoDB document)들이 생성되어
 *  db에 입력됩니다.
 */
const WordModel = model('Word', WordSchema);
const BookModel = model('Book', BookSchema);
const BookCaseModel = model('BookCase', BookCaseSchema);

module.exports = { WordModel, BookModel, BookCaseModel };
