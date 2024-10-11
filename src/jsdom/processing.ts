const omitRank = (row) =>
  row.length === 15 ? [...row.slice(0, 5), ...row.slice(6)] : row;

const getLastMatch = (idx, goals) =>
  goals[idx].length === 14 ? goals[idx] : getLastMatch(idx - 1, goals);

const transformRowToObject = (row, idx, goals) => {
  if (row.length === 1) return null;

  const match = getLastMatch(idx, goals);
  const isSameMatch = row.length === 14 ? 1 : 0;

  return {
    competition: match[1],
    matchday: match[2],
    date: match[3],
    venue: match[4],
    opponent: match[7],
    result: match[8],
    position: match[9],

    minute: row[1 + isSameMatch * 9],
    atScore: row[2 + isSameMatch * 9],
    goalType: row[3 + isSameMatch * 9],
    assist: row[4 + isSameMatch * 9],
  };
};

const prepareData = (rawData) =>
  rawData.map(omitRank).map(transformRowToObject).filter(Boolean);


export { prepareData };
