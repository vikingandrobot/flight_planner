/**
 * Mock api functions to simulate a call to the BE and saving in DB.
 */

import { v4 as uuidv4 } from 'uuid';

const DEFAULT_PLANS = [
  {
    id: uuidv4(),
    title: 'Rolex Learning Center',
    points: [
      [731340.3154337693, 5863703.367232675],
      [731338.9386689285, 5863913.189770418],
      [731041.1223817954, 5863917.498865569],
      [731037.8860904165, 5863695.899326418],
      [731181.617955783, 5863692.388874074],
      [731184.6992866171, 5863816.190429365],
    ],
  },
  {
    id: uuidv4(),
    title: 'Cathédrale de Lausanne',
    points: [
      [738723.6704740375, 5864513.580420917],
      [738663.343385889, 5864522.235484955],
      [738650.7084765892, 5864448.536886312],
      [738598.5774509882, 5864455.650035162],
      [738604.9759867397, 5864530.898794529],
      [738560.8651189235, 5864542.137459774],
    ],
  }
];

let inMemoryDB = [];
inMemoryDB = inMemoryDB.concat(DEFAULT_PLANS);

const WAIT_TIME = 1000;

export function get() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(inMemoryDB); }, WAIT_TIME);
  })
}

export function post(flightPlan) {
  inMemoryDB = inMemoryDB.concat({ ...flightPlan, id: uuidv4() });

  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, WAIT_TIME);
  })
}
