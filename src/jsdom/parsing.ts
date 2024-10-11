const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const extractText = (node: Node) => node.textContent?.trim() || '';
const processRow = (row: HTMLTableRowElement) => Array.from(row.children).map(extractText);
const parseData = (goalsHTML: string) => {
	const dom = new JSDOM(goalsHTML);
	const rows: any[] = Array.from(
		dom.window.document.querySelectorAll('.responsive-table tbody tr'),
	);
	const cells = rows.map(processRow);

	return cells;
};

export { parseData };