/**
 * Mock api functions to simulate a call to the BE and saving in DB.
 */

import { v4 as uuidv4 } from 'uuid';

let inMemoryDB = [];

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
