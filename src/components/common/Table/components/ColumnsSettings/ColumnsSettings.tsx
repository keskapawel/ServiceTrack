import { FormControl, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, InputLabel } from '@mui/material';
import { MenuProps } from './constants';

interface ColumnsSettingsProps {
  columns?: any;
  defaultColumns?: any;
  setNewColumns(data);
}

export const ColumnsSettings = ({ columns, setNewColumns, defaultColumns }: ColumnsSettingsProps) => {
  const handleClick = (column) => {
    const index = columns.findIndex((item) => item.id === column.id);
    const newArray = columns.slice();

    if (index !== -1) {
      newArray.splice(index, 1);
    } else {
      newArray.push(column);
    }
    setNewColumns(newArray);
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1 }}>
          <Select id='select-columns-multiple-checkbox' multiple value={['']} renderValue={() => 'Select Columns'} MenuProps={MenuProps} hidden>
            {defaultColumns.map((column) => (
              <MenuItem key={column.id} value={column.Header} onClick={() => handleClick(column)}>
                <Checkbox checked={columns.find((item) => item.id === column.id)} />
                <ListItemText primary={column.Header} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};
