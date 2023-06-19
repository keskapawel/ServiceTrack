import { forwardRef, memo, useMemo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

import { StyledLink } from './styled';

export type LinkIo = LinkType &
  RouterLinkConditionalProps & {
    preset?: 'primary' | 'secondary';
  };

type LinkType = Pick<LinkProps, 'children' | 'variant' | 'href' | 'target' | 'color' | 'download' | 'onClick' | 'rel' | 'sx' | 'underline'>;

type RouterLinkConditionalProps =
  | ({
      isHtmlAnchor?: false;
    } & Omit<RouterLinkProps, 'to'>)
  | {
      isHtmlAnchor: true;
    };

const Component = forwardRef<HTMLAnchorElement, LinkIo>(
  ({ children, href, target, preset = 'primary', color, isHtmlAnchor = false, underline = 'none', ...props }: LinkIo, ref) => {
    const conditionalProps = useMemo(() => {
      if (isHtmlAnchor) {
        return { href };
      }

      return { to: href, component: RouterLink };
    }, [isHtmlAnchor, href]);

    return (
      <StyledLink
        ref={ref}
        variant={'body1'}
        target={target}
        color={color ?? `text.${preset}`}
        underline={underline}
        {...conditionalProps}
        {...props}
      >
        {children}
      </StyledLink>
    );
  },
);
Component.displayName = 'Link';

export const Link = memo(Component);
