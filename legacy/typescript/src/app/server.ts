import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { HttpControllers } from '../interfaces/http/controllers';
import { HttpRequest } from '../interfaces/http/http-types';
import { ApplicationError } from '../shared/errors';
import { RequestContext } from '../shared/types';
import { createDependencies } from './container';

const readBody = async (request: IncomingMessage): Promise<unknown> => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  if (!chunks.length) return undefined;
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const send = (response: ServerResponse, status: number, payload: unknown): void => {
  response.statusCode = status;
  if (status !== 204) { response.setHeader('content-type', 'application/json; charset=utf-8'); response.end(JSON.stringify(payload)); } else response.end();
};

export const buildServer = () => {
  const controllers = new HttpControllers(createDependencies());
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? '/', 'http://localhost');
      const context: RequestContext = { requestId: request.headers['x-request-id']?.toString() ?? randomUUID(), ownerId: request.headers['x-owner-id']?.toString() ?? 'local-owner' };
      const headers = Object.fromEntries(Object.entries(request.headers).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));
      const httpRequest: HttpRequest = { method: request.method ?? 'GET', path: url.pathname, headers, body: request.method === 'POST' || request.method === 'PATCH' ? await readBody(request) : undefined, query: Object.fromEntries(url.searchParams.entries()), context };
      const result = await controllers.handle(httpRequest);
      response.setHeader('x-request-id', context.requestId);
      send(response, result.status, result.body);
    } catch (error) {
      const appError = error instanceof ApplicationError ? error : new ApplicationError('Erro interno.', 'INTERNAL_ERROR', 500);
      send(response, appError.statusCode, { error: { code: appError.code, message: appError.message } });
    }
  });
};
