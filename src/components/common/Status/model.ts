import { palette } from 'styles/palette';

export enum StatusesList {
  ongoing = 'ongoing',
  archived = 'archived',
  paused = 'paused',
  reopened = 'reopened',
  close = 'close',
  new = 'new',
  done = 'done',

  low = 'low',
  medium = 'medium',
  high = 'high',
}

const { orange, red, green, grey } = {
  orange: [palette.orange, palette.orangeBackLight],
  red: [palette.red, palette.redBackLight],
  green: [palette.myrtleGreen, palette.tiffanyBlueLight],
  grey: [palette.baseColor, palette.grayBackLight],
};

export const Colors: Record<StatusesList, string[]> = {
  // [status]: [color, background]
  [StatusesList.ongoing]: green,
  [StatusesList.archived]: grey,
  [StatusesList.paused]: grey,
  [StatusesList.reopened]: green,
  [StatusesList.close]: grey,
  [StatusesList.new]: green,
  [StatusesList.done]: grey,

  [StatusesList.low]: green,
  [StatusesList.medium]: orange,
  [StatusesList.high]: red,
};
