const { model, Schema } = require('mongoose');
const { shortId } = require('../../utils/short-id');

/** 단어 스키마 */
const WordSchema = new Schema(
	{
		short_id: shortId,
		word: { type: String, required: true },
		meanings: { type: Array, required: true },
		status: { type: Number, enum: [0, 1, 2], required: true, default: 0 },
		/**0:미분류, 1:암기완료, 2:헷갈림 */
		book: { type: String, default: '기본단어장' },
	},
	{
		collection: 'Word',
		timestamps: true,
	},
);

/** 단어, 단어장, 책장 모델 선언
 *  새로운 document를 생성하려 하면,
 *  아래 모델 클래스의 인스턴스로서 새로운 모델(mongoDB document)들이 생성되어
 *  db에 입력됩니다.
 */
const WordModel = model('Word', WordSchema);

module.exports = { WordModel };
