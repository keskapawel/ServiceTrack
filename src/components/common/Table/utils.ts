import { SortQuery } from 'models/Api';
import { SortingRule } from 'react-table';

export const orderByField = (arr, field) => {
  // Use the Array.prototype.sort() method
  arr.sort((a, b) => {
    // Compare the "order" field of each object
    return a[field] - b[field];
  });

  return arr;
};

export const mapSortingRuleToSortQuery = <ItemType>(sortBy: SortingRule<ItemType>[]): SortQuery | undefined =>
  sortBy.map(({ id, desc }) => ({
    sortField: id,
    desc: desc ? true : false,
  }))?.[0];

export const mapSortQueryToSortingRule = <ItemType>(sortBy: SortQuery | undefined): SortingRule<ItemType>[] =>
  !sortBy ? [] : [{ id: sortBy.sortField, desc: sortBy.desc }];
