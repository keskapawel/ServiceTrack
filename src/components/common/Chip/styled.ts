import { Chip } from '@mui/material';
import styled from 'styled-components';
import { fontSize } from 'styles/font';
import { palette } from 'styles/palette';

export const StyledChip = styled(Chip)`
  border-radius: 8px;
  background-color: ${palette.lightGray};
  margin-right: 8px;
  padding-inline: 4px;
  color: ${palette.baseColor};
  margin: 0 8px 0 0 !important;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 20px;
    height: 20px;
    margin-inline: 4px;
    > span {
      width: inherit;
      height: inherit;
      > div {
        width: inherit;
        height: inherit;
        > div {
          font-size: 9px;
        }
      }
      > img {
        width: inherit;
        height: inherit;
      }
    }
  }

  .MuiChip-root {
  }

  .MuiChip-label {
    padding-inline: 10px;
    color: ${palette.baseColor};
    font-size: ${fontSize[14]};
  }

  .MuiChip-deleteIcon {
    padding-right: 0;
  }
`;
