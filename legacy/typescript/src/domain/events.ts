import { Id } from '../shared/types';

export type DomainEvent = {
  type: string;
  aggregateId: Id;
  ownerId: Id;
  occurredAt: Date;
  payload: Record<string, unknown>;
};

export const connectionCreated = (aggregateId: Id, ownerId: Id, occurredAt: Date): DomainEvent => ({ type: 'connection.created', aggregateId, ownerId, occurredAt, payload: {} });
export const workflowCreated = (aggregateId: Id, ownerId: Id, occurredAt: Date): DomainEvent => ({ type: 'workflow.created', aggregateId, ownerId, occurredAt, payload: {} });
export const workflowGenerated = (aggregateId: Id, ownerId: Id, occurredAt: Date): DomainEvent => ({ type: 'workflow.steps.generated', aggregateId, ownerId, occurredAt, payload: {} });
