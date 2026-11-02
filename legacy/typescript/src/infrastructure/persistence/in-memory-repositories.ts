import { ConnectionRepository, WorkflowRepository } from '../../application/ports';
import { AiConnection } from '../../domain/connections/ai-connection';
import { Workflow } from '../../domain/workflows/workflow';
import { CursorQuery, Page } from '../../shared/types';

const decodeCursor = (cursor?: string): number => cursor ? Number.parseInt(Buffer.from(cursor, 'base64url').toString('utf8'), 10) : 0;
const encodeCursor = (index: number): string => Buffer.from(String(index), 'utf8').toString('base64url');

export class InMemoryConnectionRepository implements ConnectionRepository {
  private readonly records = new Map<string, AiConnection>();

  async save(connection: AiConnection): Promise<void> { this.records.set(connection.toJSON().id, connection); }
  async findById(ownerId: string, id: string): Promise<AiConnection | undefined> {
    const item = this.records.get(id);
    return item?.toJSON().ownerId === ownerId ? item : undefined;
  }
  async findByIdentity(ownerId: string, toolName: string, accountEmail: string): Promise<AiConnection | undefined> {
    return [...this.records.values()].find(item => { const value = item.toJSON(); return value.ownerId === ownerId && value.toolName.toLowerCase() === toolName.toLowerCase() && value.accountEmail === accountEmail.toLowerCase(); });
  }
  async list(query: CursorQuery): Promise<Page<ReturnType<AiConnection['toJSON']>>> {
    const all = [...this.records.values()].map(item => item.toJSON()).filter(item => item.ownerId === query.ownerId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const start = decodeCursor(query.cursor);
    const limit = Math.min(Math.max(query.limit ?? 20, 1), 100);
    const items = all.slice(start, start + limit);
    return { items, ...(start + limit < all.length ? { nextCursor: encodeCursor(start + limit) } : {}) };
  }
  async delete(ownerId: string, id: string): Promise<boolean> { const item = await this.findById(ownerId, id); return item ? this.records.delete(id) : false; }
}

export class InMemoryWorkflowRepository implements WorkflowRepository {
  private readonly records = new Map<string, Workflow>();
  async save(workflow: Workflow): Promise<void> { this.records.set(workflow.toJSON().id, workflow); }
  async findById(ownerId: string, id: string): Promise<Workflow | undefined> { const item = this.records.get(id); return item?.toJSON().ownerId === ownerId ? item : undefined; }
  async list(query: CursorQuery): Promise<Page<ReturnType<Workflow['toJSON']>>> {
    const all = [...this.records.values()].map(item => item.toJSON()).filter(item => item.ownerId === query.ownerId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const start = decodeCursor(query.cursor);
    const limit = Math.min(Math.max(query.limit ?? 20, 1), 100);
    const items = all.slice(start, start + limit);
    return { items, ...(start + limit < all.length ? { nextCursor: encodeCursor(start + limit) } : {}) };
  }
  async delete(ownerId: string, id: string): Promise<boolean> { const item = await this.findById(ownerId, id); return item ? this.records.delete(id) : false; }
}
