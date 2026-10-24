import { AppDependencies } from '../application/ports';
import { InMemoryConnectionRepository, InMemoryWorkflowRepository } from '../infrastructure/persistence/in-memory-repositories';
import { RuleBasedStepGenerator } from '../infrastructure/integrations/rule-based-step-generator';
import { InMemoryEventBus } from '../infrastructure/events/in-memory-event-bus';
import { randomIds, systemClock } from '../infrastructure/system';

export const createDependencies = (): AppDependencies => ({
  connections: new InMemoryConnectionRepository(),
  workflows: new InMemoryWorkflowRepository(),
  stepGenerator: new RuleBasedStepGenerator(),
  eventBus: new InMemoryEventBus(),
  clock: systemClock,
  ids: randomIds,
});
