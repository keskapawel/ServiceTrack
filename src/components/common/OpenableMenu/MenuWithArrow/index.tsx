import { Box, ClickAwayListener, Paper, PopperPlacementType, BoxProps } from '@mui/material';
import { KeyboardEvent, ReactElement, useCallback, useRef, useState } from 'react';

import { EKeyboardKey } from 'models/UtilTypes';

import { Arrow, StyledPopper } from './styled';

interface Props {
  content: ReactElement;
  children: ReactElement;
  textInput?: ReactElement;
  open: boolean;
  onClose?: () => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
  anchorElement: HTMLElement | null;
  sx?: BoxProps['sx'];
  offset?: number;
  id: string;
}

const MenuWithArrow = ({
  id,
  anchorElement,
  open,
  content,
  children,
  textInput,
  sx,
  offset = 0,
  placement = 'bottom',
  arrow = false,
  onClose = () => {},
}: Props) => {
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const popperRef = useRef(null);
  const [innerPlacementState, setInnerPlacementState] = useState(placement);
  const popperOffset = [offset, 8];

  const handleCloseOnEscape = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === EKeyboardKey.ESCAPE) {
        event.stopPropagation();
        onClose();
      }
    },
    [onClose],
  );

  return (
    <Box>
      {children}
      <StyledPopper
        popperRef={popperRef}
        open={open}
        anchorEl={anchorElement}
        placement={placement}
        disablePortal={false}
        sx={sx}
        id={id}
        modifiers={[
          {
            name: 'updatePlacementOnFlip',
            enabled: true,
            phase: 'main',
            fn({ state }) {
              if (state.placement && state.placement !== innerPlacementState) {
                setInnerPlacementState(state.placement);
              }
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              rootBoundary: 'window',
              padding: 8,
            },
          },
          {
            name: 'arrow',
            enabled: true,
            options: {
              element: arrowRef,
              padding: 8,
            },
          },
          {
            name: 'offset',
            options: {
              offset: popperOffset,
            },
          },
        ]}
      >
        <Paper>
          <ClickAwayListener onClickAway={onClose} touchEvent={false}>
            <Paper onKeyDown={handleCloseOnEscape}>
              {textInput}
              <Paper>
                {arrow ? <Arrow ref={setArrowRef} placement={innerPlacementState} /> : null}
                <Box role='menu' data-cy='filters-list'>
                  {content}
                </Box>
              </Paper>
            </Paper>
          </ClickAwayListener>
        </Paper>
      </StyledPopper>
    </Box>
  );
};

export default MenuWithArrow;
