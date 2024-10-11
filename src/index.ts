// function test(): void {
//   console.log(process.env.TEST_VALUE);
// }

// test();

import getWebContent from './Cheerio';
import llm_summary from './llm_summary';
// ora包用于显示加载中的效果，类似于前端页面的loading效果  ora github：https://github.com/sindresorhus/ora
import ora from 'ora';
import chalk from 'chalk';

import type { Ora } from 'ora'


// https://nodejs.org/api/util.html#utilparseargsconfig
// const { positionals, values } = parseArgs({
//   options: {
//     help: {
//       type: 'boolean',
//       short: 'h',
//       default: false,
//     },
//     url: {
//       type: 'string',
//     }
//   },
//   allowPositionals: true,
// });



// console.log(positionals, values);

// const { url } = values;

export async function url_llm_summary(url, others) {
  // console.log("🚀 ~ url_llm_summary ~ others:", others)

  const { model } = others

  const spinner = ora(` ${chalk.red('LLM 总结文章 ')}`).start();
  setTimeout(() => {
    spinner.text = 'Loading 文章内容';
    spinner.color = 'green'
  }, 50)

  const content = await getWebContent(url)
  if (!content) {
    console.log("没有打印内容🚀 ~ url:", url)
    setTimeout(() => {
      spinner.fail('模板下载失败!')
    }, 1500)
    spinner.stop()

    return
  }


  setTimeout(() => {
    spinner.text = '调用LLM';
    spinner.color = 'red'
  }, 0)

  await llm_summary(url, { content, model })

  spinner.succeed('调用LLM')

  spinner.stop()
}


