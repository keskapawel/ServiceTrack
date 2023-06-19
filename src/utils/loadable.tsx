/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React, { lazy, Suspense, ComponentType, ReactNode } from 'react';

const loadable = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  { fallback = null }: { fallback: ReactNode | null } = { fallback: null },
) => {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
