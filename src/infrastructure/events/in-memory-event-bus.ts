import { EventBus } from '../../application/ports';
import { DomainEvent } from '../../domain/events';

export class InMemoryEventBus implements EventBus {
  private readonly events: DomainEvent[] = [];
  async publish(event: DomainEvent): Promise<void> { this.events.push(event); }
  snapshot(): DomainEvent[] { return [...this.events]; }
}
