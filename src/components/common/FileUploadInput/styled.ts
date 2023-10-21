import { Grid } from '@mui/material';
import styled from 'styled-components';

import { Button } from 'components/common/Button';

import { palette } from 'styles/palette';

export const FileUploadWrapper = styled.div``;

export const DropZoneWrapper = styled.div<{ $isDragActive: boolean }>`
  width: 100%;
  ${({ $isDragActive }) =>
    $isDragActive &&
    ` > div {
    border-radius: 8px;
    background: ${palette.white};
    height: 100%;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%23E8EBF0' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
    border-radius: 8px;
  }`}
`;

export const DropZoneContainer = styled.div`
  display: flex;
  position: relative;
`;

export const UploadButton = styled(Button)`
  &.MuiButtonBase-root {
    width: 100%;
    display: flex;
    margin-left: 10px;
  }
`;

export const UploadInputContainer = styled(Grid)<{ $hide?: boolean }>`
  ${({ $hide }) => $hide && 'opacity: 0;'}
  display: flex;
`;

export const DropTextContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
