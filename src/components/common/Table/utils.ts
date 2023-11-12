export const orderByField = (arr, field) => {
  // Use the Array.prototype.sort() method
  arr.sort((a, b) => {
    // Compare the "order" field of each object
    return a[field] - b[field];
  });

  return arr;
};
