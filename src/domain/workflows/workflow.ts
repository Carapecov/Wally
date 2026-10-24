import { ValidationError } from '../../shared/errors';
import { Id } from '../../shared/types';

export type WorkflowStatus = 'draft' | 'saved' | 'archived';

export type WorkflowStep = {
  order: number;
  instruction: string;
  toolName?: string;
  expectedResult: string;
  missingTool?: boolean;
};

export type WorkflowProps = {
  id: Id;
  ownerId: Id;
  title: string;
  insight: string;
  connectionIds: Id[];
  context?: string;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
};

export class Workflow {
  private constructor(private props: WorkflowProps) {}

  static create(props: WorkflowProps): Workflow {
    if (!props.title.trim()) throw new ValidationError('O título do workflow é obrigatório.');
    if (!props.insight.trim()) throw new ValidationError('O insight do workflow não pode ficar vazio.');
    return new Workflow({ ...props, title: props.title.trim(), insight: props.insight.trim(), connectionIds: [...new Set(props.connectionIds)] });
  }

  replaceSteps(steps: WorkflowStep[], now: Date): void {
    this.props = { ...this.props, steps: steps.map((step, index) => ({ ...step, order: index + 1 })), updatedAt: now };
  }

  update(changes: Partial<Pick<WorkflowProps, 'title' | 'insight' | 'connectionIds' | 'context' | 'status'>>, now: Date): void {
    const next = { ...this.props, ...changes };
    if (!next.title.trim() || !next.insight.trim()) throw new ValidationError('Título e insight são obrigatórios.');
    this.props = { ...next, title: next.title.trim(), insight: next.insight.trim(), connectionIds: [...new Set(next.connectionIds)], updatedAt: now };
  }

  toJSON(): WorkflowProps { return { ...this.props, connectionIds: [...this.props.connectionIds], steps: this.props.steps.map(step => ({ ...step })) }; }
}
