import * as cheerio from 'cheerio';

import Parser from '@postlight/parser';

// const DATA_URL = "https://mp.weixin.qq.com/s/MZ4jSH1torrEpYGTLTkiEw";
const DATA_URL = "https://gksz2024.zhaopin.com/announcement/index.html";


import OpenAI from 'openai'



const openai = new OpenAI({
	baseURL: 'http://localhost:11434/v1',
	apiKey: 'ollama', // required but unused
});
// const openai = new OpenAI({
// 	baseURL: 'http://localhost:8090/v1',
// 	apiKey: '', // required but unused
// });


import { readFile, writeFile } from 'fs';


async function summary_url(url: string) {

	const body = await Parser.parse(url)
	const content_copy = decodeURIComponent(body.content);
	const $ = cheerio.load(content_copy);
	const content = $('body').text()
	// console.log("🚀 ~ $:", $('body').text())


	// 默认的对中文 不支持, 转成 uncode    ref  https://github.com/postlight/parser/pull/264

	// const decoded = body.content.replace(/&#x([0-9a-fA-F]{4});/g, (match, hexCode) => {
	// 	return String.fromCharCode(parseInt(hexCode, 16));
	// });


	const completion = await openai.chat.completions.create({
		model: 'llama3',
		messages: [
			{ role: 'system', content: '请用中文概括发给你的文章：' },
			{ role: 'user', content: content }],
	})

	console.log(completion.choices[0].message.content)


}

// NOTE: When used in the browser, you can omit the URL argument
// and simply run `Parser.parse()` to parse the current page.


(function () {
	summary_url(DATA_URL)
})()

