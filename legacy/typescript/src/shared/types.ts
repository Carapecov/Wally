export type Id = string;

export type Page<T> = {
  items: T[];
  nextCursor?: string;
};

export type CursorQuery = {
  ownerId: Id;
  cursor?: string;
  limit?: number;
};

export type Clock = {
  now(): Date;
};

export type IdGenerator = {
  next(): Id;
};

export type RequestContext = {
  requestId: string;
  ownerId: Id;
};
