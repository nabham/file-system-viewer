/**
 * @description This method is used to get extension of file
 * 
 * @param {string} name name of file
 */
export const getExtension = (name = "") => {
  return '.' + (name.split('.')[1] || '');
}

/**
 * @description This method is used to get last item of array
 * 
 * @param {array} arr list
 */
export const getLastItem = (arr) => {
  return arr[arr.length - 1];
}

/**
 * @description This method is used to remove item from array
 * 
 * @param {array} arr list
 * @param {any} item item to be deleted
 */
export const removeItem = (arr, item) => {
  arr.splice(arr.indexOf(item), 1);
}