import { memo, useMemo } from 'react';
import loadable from '../../../utils/loadable';

import { IconWrapper } from './styled';

type Props = {
  icon: string;
  color?: string;
  size?: number;
  outline?: boolean;
  alt?: string;
};

const Component = ({ icon, outline = false, size = 20, color, alt = 'icon' }: Props) => {
  const HeroIcon = useMemo(
    () =>
      loadable(
        () =>
          import(
            /* webpackMode: "lazy-once" */
            /* webpackChunkName: "HeroIcons" */
            `@heroicons/react/${outline ? 'outline' : 'solid'}/${icon}.js`
          ),
      ),
    [icon, outline],
  );

  return (
    <IconWrapper
      role='presentation'
      $outline={outline}
      $size={size}
      $color={color}
      className={`Icon Icon-${icon} Icon-${outline ? 'Outline' : 'Solid'}`}
    >
      <HeroIcon alt={alt} />
    </IconWrapper>
  );
};
Component.displayName = 'Icon';

export const Icon = memo(Component);
