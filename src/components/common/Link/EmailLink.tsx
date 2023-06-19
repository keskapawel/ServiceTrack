import { memo } from 'react';

import { Link } from './Link';

export type EmailLinkProps = {
  email?: string;
};

const Component = ({ email }: EmailLinkProps) => (
  <Link isHtmlAnchor target='_blank' rel='noreferrer' href={`mailto:${email}`}>
    {email}
  </Link>
);
Component.displayName = 'EmailLink';

export const EmailLink = memo(Component);
