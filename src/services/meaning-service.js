const axios = require('axios');
const cheerio = require('cheerio');

//wordMeaningService
class MeaningService {
	async getWordMeanings(lang, word) {
		if (lang === 'en') {
			// 영=> 한
			// 검색할 단어
			const enWord = word;
			// 다음 사전 검색 결과 페이지에서 크롤링
			try {
				const response = await axios.get(
					`https://dic.daum.net/search.do?q=${enWord}`,
				);
				const html = response.data;
				const $ = cheerio.load(html);

				// 검색 결과에서 단어 뜻 부분 추출
				const meanings = $('.cleanword_type.kuek_type > .list_search > li')
					.map((index, element) => {
						// 뜻 내용
						const desc = $(element).find('.txt_search').text().trim();
						return `${desc}`;
					})
					.get();
				return meanings;
			} catch (error) {
				console.log(error);
				throw new Error('Error occurred while fetching the meanings');
			}
		} else if (lang === 'ko') {
			// 한=> 영
			// 검색할 단어
			const koWord = word;

			// 다음 사전 검색 결과 페이지에서 크롤링
			try {
				const response = await axios.get(
					`https://dic.daum.net/search.do?q=${koWord}&dic=eng&search_first=Y`,
				);
				const html = response.data;
				const $ = cheerio.load(html);

				// 검색 결과에서 단어 뜻 부분 추출
				const meanings = $('.cleanword_type.kuke_type > .list_search > li')
					.map((index, element) => {
						// 뜻 내용
						const desc = $(element).find('.txt_search').text().trim();
						return `${desc}`;
					})
					.get();
				return meanings;
			} catch (error) {
				console.log(error);
				throw new Error('Error occurred while fetching the meanings');
			}
		}
	}
}

const meaningService = new MeaningService();
module.exports = { meaningService };
