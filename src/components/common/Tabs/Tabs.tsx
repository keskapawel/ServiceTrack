import { Children, memo, ReactNode, useId, useState } from 'react';
import { TabContext, TabListProps } from '@mui/lab';
import { TabProps } from '@mui/material';

import { StyledTab, StyledTabList, StyledTabPanel, TabsWrapper } from './styled';

type Props = Pick<TabListProps, 'orientation'> & {
  tabs: Pick<TabProps, 'label'>[];
  children: ReactNode;
  sticky?: boolean;
};

const Component = ({ orientation = 'vertical', tabs, children, sticky }: Props) => {
  const id = useId();
  const [value, setValue] = useState('0');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabsWrapper $orientation={orientation} $sticky={sticky}>
      <TabContext value={value}>
        <StyledTabList
          $orientation={orientation}
          $sticky={sticky}
          onChange={handleChange}
          orientation={orientation}
          aria-label='Tabs content'
          TabIndicatorProps={{ hidden: true }}
        >
          {tabs?.map((item, index) => (
            <StyledTab key={`${id}-tab-${index}`} $orientation={orientation} value={`${index}`} tabIndex={0} disableRipple {...item} />
          ))}
        </StyledTabList>

        {Children.map(children, (child, index) => (
          <StyledTabPanel key={`${id}-tab-${index}-content`} $orientation={orientation} value={`${index}`}>
            {child}
          </StyledTabPanel>
        ))}
      </TabContext>
    </TabsWrapper>
  );
};
Component.displayName = 'Tabs';

export const Tabs = memo(Component) as typeof Component;
