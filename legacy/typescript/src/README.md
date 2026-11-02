# Arquitetura do Wally

Esta pasta contém a implementação inicial do Wally como um **monólito modular hexagonal**. O monólito reduz o custo operacional do MVP, enquanto as portas permitem substituir persistência, autenticação, filas e provedores de IA sem contaminar o domínio.

## Decisões principais

- **Domínio isolado:** regras de cards e workflows não conhecem HTTP, banco ou SDK de terceiros.
- **Casos de uso explícitos:** toda operação entra por `application/use-cases`.
- **Acesso multiusuário preparado:** consultas e mutações recebem `ownerId`; o repositório não expõe dados de outro proprietário.
- **Integrações por contrato:** `IntegrationProvider` e `WorkflowStepGenerator` permitem múltiplos provedores sem acoplamento.
- **Persistência substituível:** o adapter em memória é útil para desenvolvimento; a porta `Repository` é o contrato para PostgreSQL ou outro armazenamento.
- **Eventos e observabilidade:** eventos de domínio, publicação assíncrona e correlação de requisições ficam na borda da aplicação.
- **Segurança por padrão:** nenhum segredo de ferramenta é modelado; o MVP guarda apenas metadados da conexão.

## Mapa de diretórios

```text
src/
├── app/                    # composição, configuração e ciclo de vida
├── application/            # casos de uso e portas
├── domain/                 # entidades, invariantes e eventos
├── infrastructure/         # adapters de persistência, integrações e observabilidade
├── interfaces/http/        # transporte HTTP, controllers e roteamento
└── shared/                 # tipos e utilitários transversais
```

## Fluxo de uma requisição

```text
HTTP -> controller -> use case -> domain -> repository/port
                                      |-> event bus -> adapters externos
```

O `ownerId` é resolvido pelo middleware de identidade em produção. O exemplo local usa `x-owner-id` apenas para tornar o servidor demonstrável; ele não é autenticação.

## Contratos HTTP implementados

```text
GET    /health
GET    /api/v1/connections
POST   /api/v1/connections
PATCH  /api/v1/connections/:id
DELETE /api/v1/connections/:id
GET    /api/v1/workflows
POST   /api/v1/workflows
GET    /api/v1/workflows/:id
POST   /api/v1/workflows/:id/generate
```

O servidor nativo em `app/server.ts` existe para manter a base sem dependência obrigatória de framework. Um adapter Fastify/Express pode implementar os mesmos controllers e portas.

## Evolução para produção

1. Implementar `ConnectionRepository` e `WorkflowRepository` em PostgreSQL, com índice composto `(owner_id, created_at, id)` e restrições de integridade.
2. Implementar `IdentityProvider` atrás do adapter de autenticação e remover o fallback de header.
3. Trocar `InMemoryEventBus` por outbox transacional + worker, mantendo os eventos de domínio.
4. Adicionar Redis para rate limit, cache e locks distribuídos quando houver necessidade medida.
5. Adicionar adapters de provedores reais no `infrastructure/integrations`, usando segredos de um secret manager e timeouts/circuit breaker.
6. Instrumentar métricas, traces e logs estruturados no adapter de observabilidade.

As decisões e limites estão registradas em `docs/architecture-decision-records.md`.
