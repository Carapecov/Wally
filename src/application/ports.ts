import { AiConnection, ConnectionProps } from '../domain/connections/ai-connection';
import { DomainEvent } from '../domain/events';
import { Workflow, WorkflowProps } from '../domain/workflows/workflow';
import { Clock, CursorQuery, Id, IdGenerator, Page } from '../shared/types';

export interface ConnectionRepository {
  save(connection: AiConnection): Promise<void>;
  findById(ownerId: Id, id: Id): Promise<AiConnection | undefined>;
  findByIdentity(ownerId: Id, toolName: string, accountEmail: string): Promise<AiConnection | undefined>;
  list(query: CursorQuery): Promise<Page<ConnectionProps>>;
  delete(ownerId: Id, id: Id): Promise<boolean>;
}

export interface WorkflowRepository {
  save(workflow: Workflow): Promise<void>;
  findById(ownerId: Id, id: Id): Promise<Workflow | undefined>;
  list(query: CursorQuery): Promise<Page<WorkflowProps>>;
  delete(ownerId: Id, id: Id): Promise<boolean>;
}

export interface WorkflowStepGenerator {
  generate(input: { insight: string; context?: string; connections: ConnectionProps[] }): Promise<WorkflowProps['steps']>;
}

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
}

export interface IntegrationProvider {
  readonly key: string;
  canHandle(toolName: string): boolean;
  health(): Promise<{ available: boolean; detail?: string }>;
}

export type AppDependencies = {
  connections: ConnectionRepository;
  workflows: WorkflowRepository;
  stepGenerator: WorkflowStepGenerator;
  eventBus: EventBus;
  clock: Clock;
  ids: IdGenerator;
};
