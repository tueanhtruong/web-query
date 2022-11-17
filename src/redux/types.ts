export interface IActionHandler<K, T> {
  (state: K, payload: UnsafeReturnType<T>): K;
}

export type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];

export type TableParams = {
  skip?: number;
  take?: number;
  order?: string;
  search?: string;
  sort?: string;
  [key: string]: number | boolean | string | string[] | undefined;
};

export type Callback = (...args: any[]) => void;
