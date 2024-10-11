// const fetch = require('node-fetch');

const DATA_URL =
  'https://www.transfermarkt.com/lionel-messi/alletore/spieler/28003/plus/1';
const loadMessiGoals = async () => {
  const response = await fetch(DATA_URL);
  return response.text();
};

export { loadMessiGoals };
