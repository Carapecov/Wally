import { AppDependencies } from '../ports';
import { Workflow, WorkflowProps } from '../../domain/workflows/workflow';
import { NotFoundError } from '../../shared/errors';
import { CursorQuery, Id } from '../../shared/types';
import { workflowCreated, workflowGenerated } from '../../domain/events';

export type CreateWorkflowInput = Omit<WorkflowProps, 'id' | 'createdAt' | 'updatedAt' | 'steps'> & { steps?: WorkflowProps['steps'] };

export class CreateWorkflow {
  constructor(private readonly deps: AppDependencies) {}
  async execute(input: CreateWorkflowInput): Promise<WorkflowProps> {
    const now = this.deps.clock.now();
    const workflow = Workflow.create({ ...input, id: this.deps.ids.next(), steps: input.steps ?? [], createdAt: now, updatedAt: now });
    await this.deps.workflows.save(workflow);
    await this.deps.eventBus.publish(workflowCreated(workflow.toJSON().id, input.ownerId, now));
    return workflow.toJSON();
  }
}

export class ListWorkflows {
  constructor(private readonly deps: AppDependencies) {}
  execute(query: CursorQuery) { return this.deps.workflows.list(query); }
}

export class GetWorkflow {
  constructor(private readonly deps: AppDependencies) {}
  async execute(ownerId: Id, id: Id): Promise<WorkflowProps> { const workflow = await this.deps.workflows.findById(ownerId, id); if (!workflow) throw new NotFoundError('Workflow'); return workflow.toJSON(); }
}

export class GenerateWorkflowSteps {
  constructor(private readonly deps: AppDependencies) {}
  async execute(ownerId: Id, id: Id): Promise<WorkflowProps> {
    const workflow = await this.deps.workflows.findById(ownerId, id);
    if (!workflow) throw new NotFoundError('Workflow');
    const value = workflow.toJSON();
    const connections = (await Promise.all(value.connectionIds.map(connectionId => this.deps.connections.findById(ownerId, connectionId)))).filter(Boolean).map(connection => connection!.toJSON());
    const steps = await this.deps.stepGenerator.generate({ insight: value.insight, context: value.context, connections });
    workflow.replaceSteps(steps, this.deps.clock.now());
    await this.deps.workflows.save(workflow);
    await this.deps.eventBus.publish(workflowGenerated(id, ownerId, this.deps.clock.now()));
    return workflow.toJSON();
  }
}
