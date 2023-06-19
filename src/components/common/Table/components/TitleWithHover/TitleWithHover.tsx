import { useState } from 'react';

import { Typography } from 'components/common/Typography';
import { Tooltip } from 'components/common/Tooltip';

import * as S from './styled';

interface IProps {
  title: string;
  hoverData: string;
}

export const TitleWithHover = ({ title, hoverData }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <S.Wrapper $isHovered={isHovered} variant={'caption'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Tooltip title={hoverData} placement='top' disableHoverListener={!hoverData}>
        <div>
          <Typography>{title}</Typography>
        </div>
      </Tooltip>
    </S.Wrapper>
  );
};
