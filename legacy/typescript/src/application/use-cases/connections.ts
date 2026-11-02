import { AppDependencies } from '../ports';
import { AiConnection, ConnectionProps } from '../../domain/connections/ai-connection';
import { ConflictError, NotFoundError } from '../../shared/errors';
import { CursorQuery, Id } from '../../shared/types';
import { connectionCreated } from '../../domain/events';

export type CreateConnectionInput = Omit<ConnectionProps, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateConnection {
  constructor(private readonly deps: AppDependencies) {}
  async execute(input: CreateConnectionInput): Promise<ConnectionProps> {
    if (await this.deps.connections.findByIdentity(input.ownerId, input.toolName, input.accountEmail)) throw new ConflictError('Já existe um card para esta ferramenta e e-mail.');
    const now = this.deps.clock.now();
    const connection = AiConnection.create({ ...input, id: this.deps.ids.next(), createdAt: now, updatedAt: now });
    await this.deps.connections.save(connection);
    await this.deps.eventBus.publish(connectionCreated(connection.toJSON().id, input.ownerId, now));
    return connection.toJSON();
  }
}

export class ListConnections {
  constructor(private readonly deps: AppDependencies) {}
  execute(query: CursorQuery) { return this.deps.connections.list(query); }
}

export class UpdateConnection {
  constructor(private readonly deps: AppDependencies) {}
  async execute(ownerId: Id, id: Id, changes: Parameters<AiConnection['update']>[0]): Promise<ConnectionProps> {
    const connection = await this.deps.connections.findById(ownerId, id);
    if (!connection) throw new NotFoundError('Card');
    connection.update(changes, this.deps.clock.now());
    await this.deps.connections.save(connection);
    return connection.toJSON();
  }
}

export class DeleteConnection {
  constructor(private readonly deps: AppDependencies) {}
  async execute(ownerId: Id, id: Id): Promise<void> { if (!await this.deps.connections.delete(ownerId, id)) throw new NotFoundError('Card'); }
}
