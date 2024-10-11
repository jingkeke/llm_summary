import { Readability } from '@mozilla/readability';
var { JSDOM } = require('jsdom');


// const DATA_URL = "https://gksz2024.zhaopin.com/announcement/index.html"
const DATA_URL = "https://gksz2024.zhaopin.com/announcement/index.html"

const loadMessiGoals2 = async () => {
  const response = await fetch(DATA_URL)

  return response.text()
}

(async () => {
  const content = await loadMessiGoals2()
  console.log(content)

  var dom = new JSDOM(content);
  // console.log( dom.window.document.querySelector("body"))


  let reader = new Readability(dom.window.document);
  let article = reader.parse();

  console.log(article)
})()
