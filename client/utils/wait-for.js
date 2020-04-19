/**
 * @desc waitFor() - Uses a recursive setTimeout to wait for a condition to be true and then runs a callback
 *
 * @param {Function} conditionFn - Function used to determine if callback should run
 * @param {Function} callback - Callback function to run if conditionFn is true
 * @param {Number} interval - Cycle time in ms for recursive timeout 
 * @param {expiration} expiration - Time in ms before polling stops
 * 
 * @return {Function|Object} - Result of the conditionFn or setTimeout of waitFor
 */

export default function waitFor(conditionFn, callback, interval = 50, expiration = 20000) {
  const conditionFnResult = conditionFn();

  // If developer has aborted the polling, return
  if (conditionFnResult === 'abort') return;

  // If element found, call callbacks
  else if (conditionFnResult) {
    callback(conditionFnResult);

    // If time has expired, return
  } else if (expiration <= 0) {
    return;

    // Otherwise, try again and decrement expiration
  } else {
    expiration -= interval;
    return setTimeout(waitFor.bind(null, conditionFn, callback, interval, expiration), interval);
  }
}