

import OpenAI from 'openai'
import { writeFile } from 'node:fs/promises';
import { parseTime } from './utils';
import path from 'node:path';
import fs from 'node:fs'
import os from 'node:os'

import ollama from 'ollama';



const openai = new OpenAI({
	baseURL: 'http://localhost:11434/v1',
	apiKey: 'ollama', // required but unused
});
// const openai = new OpenAI({
// 	baseURL: 'http://localhost:8090/v1',
// 	apiKey: '', // required but unused
// });

async function llm_summary(url: string, args: { content: string, model: string }) {
	const { content, model } = args

	// 取url 最后一个/ + 日期 作为文件名, 保存content到文件中, 然后用openai 做中文概括
	// const date = new Date().toISOString().slice(0, 10)
	const date = parseTime(new Date(), "{y}-{m}-{d}_{h}_{i}")

	const urljoin = url.split('/').join('_').replace(/[https|:|http]/g, '')
	const filename1 = 'summary_' + urljoin + date + '.txt'

	// 总结放在 ~/downloads/LLM总结 目录下
	const filename = path.join(os.homedir(), 'Downloads', 'LLM总结', filename1);


	// 如果没有目录 ,创建目录 ~/downloads/LLM总结/
	if (!fs.existsSync(path.dirname(filename))) {

		fs.mkdirSync(path.dirname(filename), { recursive: true });
	}




	// const completion = await openai.chat.completions.create({
	// 	model: 'yi:34b-chat',
	// 	messages: [
	// 		{ role: 'system', content: '请用中文概括发给你的文章：' },
	// 		{ role: 'user', content: content }],
	// })



	// ollama 

	// request <Object>: The request object containing generate parameters.
	// model <string> The name of the model to use for the chat.
	// prompt <string>: The prompt to send to the model.
	// system <string>: (Optional) Override the model system prompt.
	// template <string>: (Optional) Override the model template.
	// raw <boolean>: (Optional) Bypass the prompt template and pass the prompt directly to the model.
	// images <Uint8Array[] | string[]>: (Optional) Images to be included, either as Uint8Array or base64 encoded strings.
	// format <string>: (Optional) Set the expected format of the response (json).
	// stream <boolean>: (Optional) When true an AsyncGenerator is returned.
	// keep_alive <string | number>: (Optional) How long to keep the model loaded.
	// options <Options>: (Optional) Options to configure the runtime.
	// Returns: <GenerateResponse>

	// const summary = completion?.choices[0]?.message?.content

	const res = await ollama.generate({
		model: model,
		prompt: content,
		system: '请用中文概括发给你的文章：'
	})

	const summary = res?.response;


	console.log("*********************** 总结文章: ********************* \n\n" + summary)

	if (summary) {
		writeFile(filename, "文章url: " + url + "\n \n \n \n " + `model:${model} \n` + "*********************** 总结文章: ********************* \n" + summary + "*********************原文************* \n\n " + content + "\n\n")

	} else {
		console.log("无法获取总结 文章url: " + url)
		console.log("*********************** 原文: ********************* \n\n" + content)

		writeFile(filename, "无法获取总结 文章url: " + url + "\n\n" + "***************原文*************\n" + content + "\n \n \n \n ")
	}

	console.log(summary)
}

export default llm_summary



