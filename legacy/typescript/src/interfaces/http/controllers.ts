import { CreateConnection, CreateConnectionInput, DeleteConnection, ListConnections, UpdateConnection } from '../../application/use-cases/connections';
import { CreateWorkflow, CreateWorkflowInput, GenerateWorkflowSteps, GetWorkflow, ListWorkflows } from '../../application/use-cases/workflows';
import { AppDependencies } from '../../application/ports';
import { HttpRequest, HttpResponse } from './http-types';

const body = (request: HttpRequest): Record<string, any> => (request.body ?? {}) as Record<string, any>;
const ok = (status: number, value: unknown): HttpResponse => ({ status, body: { data: value } });

export class HttpControllers {
  private readonly createConnection: CreateConnection;
  private readonly listConnections: ListConnections;
  private readonly updateConnection: UpdateConnection;
  private readonly deleteConnection: DeleteConnection;
  private readonly createWorkflow: CreateWorkflow;
  private readonly listWorkflows: ListWorkflows;
  private readonly getWorkflow: GetWorkflow;
  private readonly generateWorkflowSteps: GenerateWorkflowSteps;

  constructor(deps: AppDependencies) {
    this.createConnection = new CreateConnection(deps); this.listConnections = new ListConnections(deps); this.updateConnection = new UpdateConnection(deps); this.deleteConnection = new DeleteConnection(deps);
    this.createWorkflow = new CreateWorkflow(deps); this.listWorkflows = new ListWorkflows(deps); this.getWorkflow = new GetWorkflow(deps); this.generateWorkflowSteps = new GenerateWorkflowSteps(deps);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const match = request.path.match(/^\/api\/v1\/(connections|workflows)(?:\/([^/]+))?(?:\/(generate))?$/);
    if (request.method === 'GET' && request.path === '/health') return ok(200, { status: 'ok' });
    if (!match) return { status: 404, body: { error: { code: 'NOT_FOUND', message: 'Rota não encontrada.' } } };
    const [, resource, id, action] = match;
    const ownerId = request.context.ownerId;
    if (resource === 'connections' && request.method === 'GET') return ok(200, await this.listConnections.execute({ ownerId, cursor: request.query.cursor, limit: Number(request.query.limit) || 20 }));
    if (resource === 'connections' && request.method === 'POST') return ok(201, await this.createConnection.execute({ ...body(request), ownerId, status: body(request).status ?? 'active' } as CreateConnectionInput));
    if (resource === 'connections' && request.method === 'PATCH' && id) return ok(200, await this.updateConnection.execute(ownerId, id, body(request)));
    if (resource === 'connections' && request.method === 'DELETE' && id) { await this.deleteConnection.execute(ownerId, id); return { status: 204, body: null }; }
    if (resource === 'workflows' && request.method === 'GET' && !id) return ok(200, await this.listWorkflows.execute({ ownerId, cursor: request.query.cursor, limit: Number(request.query.limit) || 20 }));
    if (resource === 'workflows' && request.method === 'POST' && !id) return ok(201, await this.createWorkflow.execute({ ...body(request), ownerId, status: body(request).status ?? 'draft' } as CreateWorkflowInput));
    if (resource === 'workflows' && request.method === 'GET' && id) return ok(200, await this.getWorkflow.execute(ownerId, id));
    if (resource === 'workflows' && request.method === 'POST' && id && action === 'generate') return ok(200, await this.generateWorkflowSteps.execute(ownerId, id));
    return { status: 405, body: { error: { code: 'METHOD_NOT_ALLOWED', message: 'Método não suportado.' } } };
  }
}
