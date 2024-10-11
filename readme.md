
### llm 总结 

```bash
bun run  bin/my-node-shell.ts  summary  -m llama3  https://evertpot.com/node-changelog-cli-tool/

bun run  bin/my-node-shell.ts  summary  --model llama3  https://evertpot.com/node-changelog-cli-tool/
```





## ref

[How to Set Up a Basic Node Server App with TypeScript in 2024](https://javascriptweekly.com/link/151722/rss "www.learnwithjason.dev") 

— Popular dev educator Jason with a quick tutorial on how to set up a modern Node project with TypeScript, live reloading, and loading in environment variables. 2024-03-15 12:30


The [`--watch` flag](https://nodejs.org/docs/latest/api/cli.html#--watch) was added in Node v18.11.0. 
The [`--env-file=config` flag](https://nodejs.org/docs/latest/api/cli.html#--env-fileconfig) was added in Node v20.6.0.





```bash

mkdir my-node-app
cd my-node-app/
git init
npm init -y
npm i -D typescript ts-node @types/node
npx tsc --init

```


