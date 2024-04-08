export const Identifiers = {
  DraggableService: Symbol.for('DraggableService'),
  Panel: Symbol.for('Panel'),
  Frame: Symbol.for('Frame'),
  FrameContent: Symbol.for('FrameContent'),
  Workbench: Symbol.for('Workbench'),
}

export enum EdgePosition {
  TOP_LEFT = 'TOP_LEFT',
  TOP = 'TOP',
  TOP_RIGHT = 'TOP_RIGHT',
  RIGHT_TOP = 'RIGHT_TOP',
  RIGHT = 'RIGHT',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM = 'BOTTOM',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  LEFT = 'LEFT',
  LEFT_TOP = 'LEFT_TOP',
  UNKNOWN = 'UNKNOWN',
}

export const SIDE_NAV = {
  CodeTemplate: Symbol.for('CodeTemplate'),
}
