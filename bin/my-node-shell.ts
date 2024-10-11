#! /usr/bin/env bun
// @ts-nocheck
import { parseArgs } from "node:util";
// import { get } from "node:http";
import * as nodeurl from "node:url";
import fs from "node:fs/promises";
import chalk from 'chalk';
// import { url_llm_summary } from "../dist/index.js";
import { url_llm_summary } from "../src/index.ts";





async function main() {
  // https://nodejs.org/api/util.html#utilparseargsconfig
  const { positionals, values } = parseArgs({
    options: {
      help: {
        type: "boolean",
        short: "h",
        default: false,
        description: "命令行工具 -jzy 目前包括 llmsummary",
      },
      model: {
        type: "string",
        short: "m",
        default: "llama3",
        description: "使用模型",
      },
      all: {
        type: 'boolean',
        default: false,
        description: 'Show all versions',
      },
    },
    allowPositionals: true,
  });

  console.log(positionals, '\n');
  console.log(values,);

  if (positionals.length < 1 || values.help) {
    await help();
    process.exit(1);
  }

  const command = positionals[0];


  switch (command) {
    case "summary":
      const url = positionals[positionals.length - 1];

      summary(url, { model: values.model });
      break;
    default:
      help();
      process.exit(1);
  }
}

try {
  main();

} catch (error: any) {
  process.stderr.write('Error: ' + error.message + '\n');
  process.exit(1);
}



function summary(url, args) {
  //     const { url } = values;
  //
  // (async () => {
  //
  // 	if (url) {
  //
  // 		url_llm_summary(url)
  //
  //
  // 	}
  //
  // })()

  if (!url) {
    console.error(chalk.red("url 参数不能为空"));
    process.exit(1);
  }

  url_llm_summary(url, args);
}


async function help() {
  const pkg = JSON.parse(
    await fs.readFile(
      nodeurl.fileURLToPath(nodeurl.resolve(import.meta.url, "../package.json")),
      "utf-8",
    ),
  );
  console.log(
    `jzy Tool v${pkg.version}

工具集合  2024-04-26 06:33

Usage:
    my-node-shell  --url  - 生成llm_summary

`,
  );
}
