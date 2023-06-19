import { BoldTypography, SecondaryTypography, StyledTypography, WhiteTypography } from './styled';
import type { TypographyType } from './types';

export const TypeToComponentMap: Record<TypographyType, typeof StyledTypography> = {
  default: StyledTypography,
  secondary: SecondaryTypography,
  white: WhiteTypography,
  bold: BoldTypography,
};
