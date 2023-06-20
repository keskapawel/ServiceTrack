import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { capitalizeFirstLetter } from 'utils/common';

import { Icon } from 'components/common/Icon';
import { palette } from 'styles/palette';

import * as S from './styled';

enum pathTitles {
  manageUsers = 'Manage Users',
  settings = 'Settings',
}

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location?.pathname?.split('/').filter((x) => x);
  return (
    <S.Wrapper>
      <MUIBreadcrumbs aria-label='Current location in app' separator={<Icon icon={'ChevronRightIcon'} color={palette.lightIcon} />}>
        {pathnames.length > 0 ? (
          <S.StyledLink
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            tabIndex={0}
          >
            <Icon icon='HomeIcon' />
          </S.StyledLink>
        ) : (
          <S.StyledLink $preventHover>
            <Icon icon='HomeIcon' />
          </S.StyledLink>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? undefined : (
            <S.StyledLink
              key={name}
              onClick={(e) => {
                e.preventDefault();
                navigate(routeTo);
              }}
              tabIndex={0}
            >
              {pathTitles[name] ?? capitalizeFirstLetter(name)}
            </S.StyledLink>
          );
        })}
      </MUIBreadcrumbs>
    </S.Wrapper>
  );
};
