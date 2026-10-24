# Núcleo de Segurança

> **Missão:** Reduzir riscos técnicos e operacionais, proteger dados e validar a segurança ao longo do ciclo de vida do projeto.  
> **Localização:** `nucleos/seguranca/`

---

## 1. Agentes Especialistas

Este núcleo é composto por 7 agentes especialistas:

- **[SE-01 — Arquiteto de Segurança](agentes/SE-01-arquitetura-seguranca.md)**: definir princípios, controles e requisitos de segurança proporcionais ao risco.
- **[SE-02 — Analista de Ameaças e Riscos](agentes/SE-02-ameacas-riscos.md)**: identificar ameaças, ativos críticos, vulnerabilidades potenciais e prioridades de mitigação.
- **[SE-03 — Especialista em Segurança de Aplicações](agentes/SE-03-seguranca-aplicacoes.md)**: avaliar autenticação, autorização, validação de entrada, sessões e exposição de dados.
- **[SE-04 — Especialista em Identidade e Acesso](agentes/SE-04-identidade-acesso.md)**: revisar papéis, permissões, autenticação e ciclo de vida das contas.
- **[SE-05 — Especialista em Privacidade e Proteção de Dados](agentes/SE-05-privacidade-dados.md)**: colaborar com Legislação e Desenvolvimento para proteger dados pessoais e sensíveis.
- **[SE-06 — Especialista em Segurança de Infraestrutura](agentes/SE-06-infraestrutura.md)**: revisar ambientes, configurações, dependências, logs, cópias de segurança e exposição de serviços.
- **[SE-07 — Validador de Segurança e Resposta a Incidentes](agentes/SE-07-validacao-incidentes.md)**: validar correções, preparar procedimentos de resposta e registrar lições aprendidas.

---

## 2. Estrutura de Pastas Operacionais

- `agentes/`: fichas detalhadas de cada agente do núcleo com papéis, limites e escalonamento.
- `nucleos/seguranca/modelos-de-ameacas/`: guarda artefatos específicos desta área de especialidade.
- `nucleos/seguranca/avaliacoes-de-risco/`: guarda artefatos específicos desta área de especialidade.
- `nucleos/seguranca/revisoes-de-aplicacao/`: guarda artefatos específicos desta área de especialidade.
- `nucleos/seguranca/revisoes-de-acesso/`: guarda artefatos específicos desta área de especialidade.
- `nucleos/seguranca/revisoes-de-infraestrutura/`: guarda artefatos específicos desta área de especialidade.
- `nucleos/seguranca/incidentes/`: guarda artefatos específicos desta área de especialidade.

---

## 3. Protocolo de Atuação e Governança

1. **Entrada de Demanda:** pedidos chegam estruturados conforme o modelo de passagem de trabalho (`governanca/modelos/passagem-de-trabalho.md`).
2. **Execução Especializada:** agentes utilizam suas skills e respeitam estritamente a seção *"Não deve fazer"*.
3. **Validação:** artefatos são submetidos a revisão interna e verificação de evidências antes do repasse.
4. **Escalonamento Humano:** decisões críticas de negócio, conformidade, segurança ou custos são encaminhadas ao responsável humano.
