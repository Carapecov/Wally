import { ConflictError, ValidationError } from '../../shared/errors';
import { Id } from '../../shared/types';

export type ConnectionCategory = 'chat' | 'image' | 'code' | 'research' | 'audio' | 'other';
export type ConnectionStatus = 'active' | 'inactive';

export type ConnectionProps = {
  id: Id;
  ownerId: Id;
  toolName: string;
  accountEmail: string;
  plan: string;
  status: ConnectionStatus;
  notes?: string;
  category?: ConnectionCategory;
  accessUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class AiConnection {
  private constructor(private props: ConnectionProps) {}

  static create(props: ConnectionProps): AiConnection {
    if (!props.toolName.trim()) throw new ValidationError('O nome da ferramenta é obrigatório.');
    if (!props.accountEmail.includes('@')) throw new ValidationError('O e-mail da conta é inválido.');
    if (!props.plan.trim()) throw new ValidationError('O plano é obrigatório.');
    return new AiConnection({ ...props, toolName: props.toolName.trim(), accountEmail: props.accountEmail.trim().toLowerCase() });
  }

  update(changes: Partial<Pick<ConnectionProps, 'toolName' | 'accountEmail' | 'plan' | 'status' | 'notes' | 'category' | 'accessUrl'>>, now: Date): void {
    const next = { ...this.props, ...changes };
    if (!next.toolName.trim() || !next.plan.trim()) throw new ValidationError('Nome e plano são obrigatórios.');
    if (!next.accountEmail.includes('@')) throw new ValidationError('O e-mail da conta é inválido.');
    this.props = { ...next, toolName: next.toolName.trim(), accountEmail: next.accountEmail.trim().toLowerCase(), updatedAt: now };
  }

  ensureOwnedBy(ownerId: Id): void {
    if (this.props.ownerId !== ownerId) throw new ConflictError('O recurso não pertence ao proprietário informado.');
  }

  toJSON(): ConnectionProps { return { ...this.props }; }
}
