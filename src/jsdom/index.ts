import { loadMessiGoals } from './fetching';
import { parseData } from './parsing';
import { prepareData } from './processing';
import { saveStats } from './saving';

loadMessiGoals().then(parseData).then(prepareData).then(saveStats);