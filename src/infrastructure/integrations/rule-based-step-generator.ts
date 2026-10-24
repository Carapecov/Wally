import { WorkflowStepGenerator } from '../../application/ports';
import { WorkflowStep } from '../../domain/workflows/workflow';

export class RuleBasedStepGenerator implements WorkflowStepGenerator {
  async generate(input: Parameters<WorkflowStepGenerator['generate']>[0]): Promise<WorkflowStep[]> {
    const tools = input.connections;
    const first = tools[0];
    const last = tools[tools.length - 1];
    const steps: WorkflowStep[] = [
      { order: 1, instruction: `Defina o escopo e os critérios de sucesso para: ${input.insight}`, expectedResult: 'Objetivo, entradas e critérios de sucesso registrados.' },
      { order: 2, instruction: first ? `Prepare o material inicial e envie-o para ${first.toolName}.` : 'Escolha uma ferramenta cadastrada para preparar o material inicial.', toolName: first?.toolName, expectedResult: 'Primeiro resultado ou rascunho disponível.', missingTool: !first },
      { order: 3, instruction: last ? `Revise, refine e consolide o resultado usando ${last.toolName}.` : 'Revise o resultado em uma ferramenta adequada ainda não cadastrada.', toolName: last?.toolName, expectedResult: 'Entrega revisada e pronta para uso.', missingTool: !last },
    ];
    if (input.context?.trim()) steps[0].instruction += ` Considere também: ${input.context.trim()}`;
    return steps;
  }
}

export class IntegrationRegistry {
  private readonly providers = new Map<string, import('../../application/ports').IntegrationProvider>();
  register(provider: import('../../application/ports').IntegrationProvider): void { this.providers.set(provider.key, provider); }
  resolve(toolName: string): import('../../application/ports').IntegrationProvider | undefined { return [...this.providers.values()].find(provider => provider.canHandle(toolName)); }
}
