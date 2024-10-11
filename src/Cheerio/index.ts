import * as cheerio from 'cheerio';

import Parser from '@postlight/parser';

// const DATA_URL = "https://mp.weixin.qq.com/s/MZ4jSH1torrEpYGTLTkiEw";




async function getWebContent(url: string) {

	const body = await Parser.parse(url)
	const content_copy = decodeURIComponent(body.content);
	const $ = cheerio.load(content_copy);
	const content = $('body').text()
	// console.log("🚀 ~ $:", $('body').text())



	// 默认的对中文 不支持, 转成 uncode    ref  https://github.com/postlight/parser/pull/264

	// const decoded = body.content.replace(/&#x([0-9a-fA-F]{4});/g, (match, hexCode) => {
	// 	return String.fromCharCode(parseInt(hexCode, 16));
	// });


	return content
}

// NOTE: When used in the browser, you can omit the URL argument
// and simply run `Parser.parse()` to parse the current page.

export default getWebContent;



