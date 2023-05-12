const { model, Schema } = require('mongoose');
const { shortId } = require('../../utils/short-id');

/** 단어장 스키마 */
const BookSchema = new Schema(
	{
		short_id: shortId,
		name: { type: String, required: true },
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

const BookModel = model('Book', BookSchema);
module.exports = { BookModel };
