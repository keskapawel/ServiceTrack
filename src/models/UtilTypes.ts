export enum EYesNo {
  YES = 'Yes',
  NO = 'No',
}

export const BooleanToYesNoMap = {
  true: EYesNo.YES,
  false: EYesNo.NO,
  undefined: 'N/A',
};

export type SelectOption = { fullName: string; key: string };

export enum EKeyboardKey {
  ESCAPE = 'Escape',
  BACKSPACE = 'Backspace',
}
