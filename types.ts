import type { ReactElement } from 'react';

export enum AppState {
  UPLOADING,
  CAPTURING,
  DETECTING,
  PLAYING,
  LOADING,
}

export interface Tool {
  id: string;
  name: string;
  // Fix: Changed type from JSX.Element to the imported ReactElement to resolve 'Cannot find namespace 'JSX'' error.
  icon: ReactElement;
  cost: number;
}

export interface FaceBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
