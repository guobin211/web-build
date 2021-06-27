type CloseFn = () => void;

export interface BasePopElement {
  open: (key?: string) => CloseFn;
  close: CloseFn;
}
