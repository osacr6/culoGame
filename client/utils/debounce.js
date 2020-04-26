/**
 * @desc debounce() prevents a function from being invoked repeatedly.
 * The function will be called again after it stops being called for N milliseconds.
 *
 * @param {Function} fn - the function to debounce
 * @param {Number} wait - rate limit in milliseconds
 * @param {Boolean} [leading=false] - if true, trigger fn on leading edge
 *
 * @return {Function} - the debounced function
 */
export default function debounce(fn, wait) {
  var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    function later() {
      timeout = null;
      if (!leading) fn.apply(void 0, args);
    }

    var callNow = leading && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(void 0, args);
  };
}