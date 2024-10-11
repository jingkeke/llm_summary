// @ts-check
//
// 参考   changelog-tool /Users/jingzy/develop/my/my-scripts-shell-sql/node/node-cli-changelog_tool2

import { test } from 'node:test';
import * as assert from 'node:assert';

test('Parsing changelog metadata', async () => {

  const input = `Time for a change
=========

0.2.0 (????-??-??)
------------------

* Implemented the 'list' command.
* Added testing framework.

0.1.0 (2023-02-08)
------------------

* Implemented the 'help' and 'init' commands.
*
`;

const result={title:'Time for a change',versions:[{version:'0.2.0',date:null},{version:'0.1.0',date:'2023-02-08'}]}

  assert.equal('Time for a change', result.title);
  assert.equal(2, result.versions.length);
  
  assert.equal(null, result.versions[0].date);
  assert.equal('0.2.0', result.versions[0].version);
  assert.equal('2023-02-08', result.versions[1].date);
  assert.equal('0.1.0', result.versions[1].version);

});

test('Parsing changelog entries', async () => {
    
  assert.equal(2, 2)



});



// test('Link references', async() => {
//
//
//   const result = await parse(input);
//
//   assert.deepEqual({
//     name: '1',
//     href: 'https://evertpot.com/',
//     title: 'My Blog',
//   }, result.links[0]);
//   assert.deepEqual({
//     name: '2',
//     href: 'https://indieweb.social/@evert',
//     title: 'My Mastodon account, but it\'s split over two lines',
//   }, result.links[1]);
//   assert.deepEqual({
//     name: 'blabla',
//     href: 'http://example',
//     title: null,
//   }, result.links[2]);
//
// });
//
