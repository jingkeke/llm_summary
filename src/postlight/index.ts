import Parser from '@postlight/parser';

// const DATA_URL = "https://mp.weixin.qq.com/s/MZ4jSH1torrEpYGTLTkiEw";
const DATA_URL = "https://gksz2024.zhaopin.com/announcement/index.html";

import * as cheerio from 'cheerio';


// Parser.parse(DATA_URL).then(result => console.log(result));


// "&#x5FEB;&#x901F;&#x7B80;" 如何能 ddecode成 "快速简"

// 使用正则 /&#x([0-9a-fA-F]{4});/g 匹配 HTML 实体编码
// 在替换函数中,提取编码中的16进制数值 hexCode
// 使用 String.fromCharCode(parseInt(hexCode, 16)) 将16进制转为对应的字符
// const encoded = "&#x5FEB;&#x901F;&#x7B80;";
// const decoded = encoded.replace(/&#x([0-9a-fA-F]{4});/g, (match, hexCode) => {
//   return String.fromCharCode(parseInt(hexCode, 16)); 
// });

// console.log(decoded); // "快速简"


(async () => {
	const content = await Parser.parse(DATA_URL)
	// const newLocal = decodeURI(content.content);
	// console.log(newLocal, decodeURIComponent(content.content));
	// 默认的对中文 不支持, 转成 uncode    ref  https://github.com/postlight/parser/pull/264

	// 方案一
	const $ = cheerio.load(content.content);
	console.log("🚀 ~ $:", $('body').text())

	// 方案2
	const decoded = content.content.replace(/&#x([0-9a-fA-F]{4});/g, (match, hexCode) => {
		return String.fromCharCode(parseInt(hexCode, 16));
	});
	console.log("🚀 ~ decoded ~ decoded:", decoded)


})()

// NOTE: When used in the browser, you can omit the URL argument
// and simply run `Parser.parse()` to parse the current page.

