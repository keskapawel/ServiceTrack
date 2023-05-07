import React, { memo } from 'react';
import Helmet from 'react-helmet';

interface Props {
  title: string;
  description?: string;
}

const Component = ({ title, description }: Props) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name='description' content={description} />}
  </Helmet>
);

Component.displayName = 'HelmetTags';

export const HelmetTags = memo(Component);
