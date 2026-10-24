import { randomUUID } from 'node:crypto';
import { Clock, IdGenerator } from '../shared/types';

export const systemClock: Clock = { now: () => new Date() };
export const randomIds: IdGenerator = { next: () => randomUUID() };
