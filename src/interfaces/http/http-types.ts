import { RequestContext } from '../../shared/types';

export type HttpRequest = { method: string; path: string; headers: Record<string, string | undefined>; body?: unknown; query: Record<string, string | undefined>; context: RequestContext };
export type HttpResponse = { status: number; body: unknown };
