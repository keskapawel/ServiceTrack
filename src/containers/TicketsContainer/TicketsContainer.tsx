import { dummyData } from './dummyData';
import * as tableData from './constants';
import { Table } from 'components/common/Table';

const TicketsContainer = () => {
  const handleRowClick = (value: any) => {};

  return (
    <>
      <Table
        columns={tableData.columns}
        enableSortBy
        data={dummyData ?? []}
        isLoading={false}
        itemIdAccessor={'id'}
        lastCellBorder
        redirectOnClick
        onRowClick={handleRowClick}
      />
    </>
  );
};
export default TicketsContainer;
