# Registros de decisão arquitetural

## ADR-001 — Monólito modular hexagonal

- **Contexto:** o Wally começa como MVP, mas precisa suportar acessos concorrentes e futuras integrações.
- **Decisão:** separar domínio, aplicação, infraestrutura e interfaces; manter um deploy inicial único.
- **Alternativas:** microserviços desde o primeiro corte; arquitetura CRUD acoplada ao framework.
- **Motivo:** preserva simplicidade operacional sem fechar a porta para escala horizontal ou extração posterior de módulos.
- **Impacto:** exige interfaces explícitas e disciplina de dependências.

## ADR-002 — Isolamento por proprietário desde o primeiro endpoint

- **Contexto:** o MVP é single-user, mas o plano prevê pequeno time no futuro.
- **Decisão:** toda leitura e mutação usa `ownerId` e os contratos de repositório são owner-scoped.
- **Motivo:** evita uma migração perigosa de segurança quando contas compartilhadas forem introduzidas.
- **Impacto:** o adapter HTTP precisa receber uma identidade confiável; `x-owner-id` é somente um fallback local.

## ADR-003 — Integrações orientadas a portas

- **Contexto:** o Wally pode gerar roteiros com regras hoje e modelos/provedores amanhã.
- **Decisão:** usar `WorkflowStepGenerator` e `IntegrationProvider`, registrados por chave.
- **Motivo:** permite adicionar provedores sem alterar entidades ou casos de uso.
- **Impacto:** adapters reais devem definir timeout, retries, limites e tratamento de falhas.

## ADR-004 — Eventos com publicação desacoplada

- **Contexto:** notificações, auditoria, indexação e integrações não devem bloquear a operação principal.
- **Decisão:** casos de uso publicam eventos; a infraestrutura decide se a entrega é síncrona ou via outbox/worker.
- **Motivo:** mantém o caminho crítico pequeno e prepara processamento assíncrono.
- **Impacto:** produção precisa de outbox transacional e estratégia de idempotência.

## ADR-005 — Sem segredos de ferramentas no MVP

- **Contexto:** o plano explicitamente exclui OAuth, API keys e execução automática.
- **Decisão:** a entidade guarda metadados da conta, não credenciais.
- **Motivo:** reduz risco de privacidade e superfície de ataque.
- **Impacto:** integrações futuras deverão usar secret manager e consentimento explícito.
