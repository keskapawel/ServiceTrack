import styled from 'styled-components';

import { TextInput } from './TextInput';

export const StyledSearchInput = styled(TextInput)`
  & {
    width: 200px;

    .Icon-XIcon {
      display: none;
    }
  }

  &:hover,
  &:focus-within {
    .Icon-XIcon {
      display: initial;
    }
  }
`;
