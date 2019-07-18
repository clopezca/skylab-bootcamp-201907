/**
 * Removes the first element from an array and returns that removed element. This method changes the length of the array.
 * 
 * @param {Array} array 
 * 
 * @returns {*} 
 */

function shift(array) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  var first = array[0];
  for(var i = 1; i < array.length; i++) {
      array[i-1] = array[i];
    }
  array.length = array.length - 1;
  return first;
}