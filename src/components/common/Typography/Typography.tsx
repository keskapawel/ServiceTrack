import { ElementType, memo, useCallback, useMemo, useRef, useState } from 'react';
import { TypographyProps } from '@mui/material';
import useResizeObserver from 'use-resize-observer';

import { shortenString } from '../../../utils/common';

import { Tooltip } from 'components/common/Tooltip';

import { TypographyType } from './types';
import { TypeToComponentMap } from './constants';

type Props = {
  component?: ElementType;
  type?: TypographyType;
  trim?: number;
  disableHoverListener?: boolean;
  showNa?: boolean;
  ellipsis?: number | true; // in comparison to `trim`, it is multi-line
} & Pick<
  TypographyProps,
  'id' | 'children' | 'variant' | 'align' | 'color' | 'pl' | 'pr' | 'pt' | 'pb' | 'px' | 'py' | 'sx' | 'textAlign' | 'fontWeight' | 'tabIndex'
>;

const Component = ({ children, type = 'default', component, trim, disableHoverListener, showNa, ellipsis, ...props }: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const onResize = useCallback(() => {
    if (ellipsis && ref.current) {
      if (
        // width for single-line, height for multi-line ellipsis
        ref.current.scrollWidth > ref.current.clientWidth ||
        ref.current.scrollHeight > ref.current.clientHeight
      ) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    }
  }, [ellipsis]);

  useResizeObserver<HTMLElement>({
    ref,
    onResize,
  });

  const TypographyComponent = TypeToComponentMap[type];

  const isNaShown = useMemo(
    () => showNa && (!children || children === 'N/A' || (typeof children === 'string' && !children?.trim())),
    [children, showNa],
  );

  const getChildren = useCallback(() => {
    if (isNaShown) return 'N/A';

    if (trim != undefined && typeof children == 'string')
      return (
        <Tooltip disableHoverListener={disableHoverListener} title={children}>
          <div>{shortenString(children, trim)}</div>
        </Tooltip>
      );

    return children;
  }, [trim, children, disableHoverListener, isNaShown]);

  if (ellipsis)
    return (
      <Tooltip disableHoverListener={!showTooltip} disableTouchListener={!showTooltip} disableFocusListener={!showTooltip} title={children ?? ''}>
        <TypographyComponent ref={ref} {...(component ? { component } : {})} $ellipsis={ellipsis} $isNaShown={isNaShown} {...props}>
          {getChildren()}
        </TypographyComponent>
      </Tooltip>
    );

  return (
    <TypographyComponent ref={ref} {...(component ? { component } : {})} $ellipsis={ellipsis} $isNaShown={isNaShown} {...props}>
      {getChildren()}
    </TypographyComponent>
  );
};
Component.displayName = 'Typography';

export const Typography = memo(Component) as typeof Component;
