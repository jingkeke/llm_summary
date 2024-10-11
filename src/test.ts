import { writeFile } from 'node:fs/promises';
import { parseTime } from './utils';


writeFile('test.txt', 'test \n' + "\n" + "***********************/n summary: /n" + "test")


const date = parseTime(new Date(), "{y}-{m}-{d}_{h}_{i}")
console.log("🚀 ~ date:", date)



import ollama from 'ollama';

(async () => {


	const res = await ollama.generate({
		model: "llama3",
		prompt: 'The Ollama JavaScript library provides the easiest way to integrate your JavaScript project with Ollama.  ',
		system: '请用中文概括发给你的文章：'
	})

	console.log("🚀 ~ res:", res)

})()