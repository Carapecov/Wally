# Plano — Wally (antigo Hub de IAs)

Documento de escopo do produto. Serve como referência para decisões de produto, UX e implementação. Não é um spec técnico fechado.

## 1. Visão

O **Wally** é um painel pessoal para organizar as ferramentas de inteligência artificial que a pessoa usa no dia a dia. Em um só lugar, o usuário:

- cadastra cada ferramenta (ex.: ChatGPT, Claude, Gemini, Midjourney) como um **card**;
- registra o **e-mail da conta** e o **plano atual**;
- vê, de forma rápida, quais conexões estão ativas;
- cria **workflows**: ideias de fluxos que combinam essas ferramentas;
- recebe um **passo a passo gerado** para adotar aquele fluxo.

O valor não é substituir as IAs. É lembrar o que já está contratado, como se conecta, e transformar intenções (“quero um fluxo de pesquisa + redação + revisão”) em uma linha de instruções acionável.

## 2. Problema

Quem usa várias IAs acaba com:

- contas espalhadas (e-mails diferentes, planos misturados);
- dificuldade de saber o que já está disponível na hora de montar um fluxo;
- ideias de processo que ficam só na cabeça, sem um roteiro claro para repetir.

O Wally reduz essa fragmentação: inventário das ferramentas + oficina de workflows.

## 3. Público

Usuário único (uso pessoal ou pequeno time no futuro). Perfil típico:

- já usa 2+ ferramentas de IA;
- mistura chat, imagem, código, pesquisa ou automação;
- quer padronizar “como eu faço X” com essas ferramentas.

Fora do MVP: marketplace público, login social corporativo, billing próprio das IAs.

## 4. Conceitos

| Conceito | Significado |
| --- | --- |
| **Card de IA** | Registro de uma ferramenta: nome, conta (e-mail), plano, status da conexão. |
| **Conexão** | Relação entre o usuário e aquela ferramenta no Wally. “Ativa” significa cadastrada e marcada como em uso. |
| **Workflow** | Insight/fluxo: objetivo + ferramentas envolvidas + contexto. |
| **Passo a passo** | Sequência gerada a partir do workflow, para o usuário seguir e adotar o processo. |

## 5. Navegação

Duas abas principais:

1. **Wally Hub** (início) — grade de cards das IAs e conexões ativas.
2. **Workflows** — lista de insights/fluxos e geração do passo a passo.

Complementos leves no MVP:

- ação global **Novo card** (Hub);
- ação global **Novo workflow** (Workflows);
- eventual **Detalhe** de um card ou de um workflow (página ou painel lateral).

Fora do MVP: Configurações avançadas, times, marketplace de templates públicos.

## 6. Escopo funcional — Wally Hub

### 6.1 Cards de IA

O usuário cria um card com no mínimo:

- **Nome da ferramenta** (ex.: ChatGPT);
- **E-mail da conta** usada nela;
- **Plano atual** (ex.: Free, Plus, Team, Pro — texto livre no MVP, lista sugerida depois);
- **Status**: ativa / inativa (padrão: ativa).

Campos opcionais úteis no MVP:

- notas (para que usa, limites, atalhos);
- categoria (chat, imagem, código, pesquisa, áudio, outro);
- URL de acesso (link para abrir a ferramenta).

### 6.2 Visualização

- Grade de cards das conexões **ativas** em destaque.
- Cards inativos visíveis com filtro (“mostrar inativas”) ou seção recolhida.
- Cada card resume: nome, e-mail, plano, status.
- Indicador simples de “conexões ativas” (ex.: “4 IAs ativas”).

### 6.3 Gestão

- Editar e excluir card.
- Alternar status ativo/inativo sem apagar o cadastro.
- Não há, no MVP, login OAuth real nas APIs das IAs. “Conexão” é o cadastro no Wally, não autenticação automática na ferramenta.

## 7. Escopo funcional — Workflows

### 7.1 Criar insight / fluxo

O usuário cria um workflow com:

- **Título** (ex.: “Pesquisa → rascunho → revisão de texto”);
- **Objetivo / insight** (texto livre: o que quer alcançar);
- **Ferramentas envolvidas** (seleção a partir dos cards cadastrados);
- **Contexto opcional** (público, tom, frequência, restrições).

O insight pode nascer incompleto: o sistema ainda assim deve conseguir sugerir um roteiro, deixando explícito o que falta (ex.: “nenhuma IA de imagem cadastrada”).

### 7.2 Gerar passo a passo

A partir do workflow, o sistema gera uma **linha de instruções**:

- etapas numeradas;
- para cada etapa: o que fazer, **qual IA usar** (quando houver card correspondente), e o resultado esperado;
- ordem lógica (preparar input → gerar → refinar → entregar);
- aviso se alguma etapa pede uma ferramenta que o usuário **não cadastrou**.

O usuário pode:

- regenerar o passo a passo;
- editar etapas manualmente;
- marcar o workflow como “em uso” / rascunho / arquivado (opcional no MVP: só rascunho vs. salvo).

### 7.3 Lista de workflows

- Lista ou cards: título, ferramentas citadas, data.
- Abrir detalhe: insight original + passo a passo atual.
- Excluir ou duplicar (duplicar é desejável, não obrigatório no primeiro corte).

## 8. Fluxos principais do usuário

### 8.1 Cadastrar uma IA

1. Entra no Wally Hub.
2. Clica em **Novo card**.
3. Informa ferramenta, e-mail e plano.
4. Salva.
5. O card aparece nas conexões ativas.

### 8.2 Montar um workflow

1. Vai à aba **Workflows**.
2. Clica em **Novo workflow**.
3. Escreve o insight e escolhe as IAs cadastradas no Wally.
4. Pede para **gerar passo a passo**.
5. Lê, ajusta se quiser, e guarda o roteiro para adotar no dia a dia.

### 8.3 Adotar o fluxo

O passo a passo é o artefato de adoção: o usuário segue as etapas fora do Wally (nas próprias ferramentas). O Wally não executa as IAs no MVP; ele orquestra a memória e o roteiro.

## 9. Regras de produto

- Um e-mail por card; a mesma ferramenta pode ter mais de um card se houver contas diferentes (ex.: ChatGPT pessoal e ChatGPT do trabalho).
- Workflows só sugerem IAs que existem no Wally, salvo etapas genéricas (“abra a ferramenta X” quando X não estiver cadastrada).
- Geração de passo a passo depende de um texto de insight não vazio.
- Exclusão de um card não apaga workflows; as etapas que citavam essa IA ficam com referência quebrada visível (“ferramenta removida”).
- Dados são do usuário dono da conta do Wally (single-user no MVP).

## 10. Fora de escopo (MVP)

- Integração real (API keys, OAuth, sync de uso/fatura das IAs).
- Executar prompts automaticamente nas ferramentas.
- Colaboração em tempo real, papéis e permissões.
- App mobile nativo.
- Cobrança automatizada no primeiro corte (embora estejamos modelando planos pagos futuros na arquitetura).
- Biblioteca pública de workflows de terceiros.

Esses itens podem entrar em versões posteriores; o MVP valida o hábito de cadastrar contas e materializar fluxos.

## 11. Requisitos não funcionais

- Interface clara em português.
- Uso desktop-first; layout usável em tela estreita.
- Persistência local ou conta simples — decisão de implementação posterior; o produto precisa lembrar cards e workflows entre sessões.
- Tempo de geração do passo a passo perceptível (feedback de loading), sem travar a tela.
- Não armazenar senhas das ferramentas de IA no MVP.

## 12. Critérios de sucesso do MVP

O MVP do Wally está completo quando o usuário consegue:

1. cadastrar ChatGPT (ou outra IA) com e-mail e plano e vê-lo como card ativo;
2. inativar ou editar esse card;
3. criar um workflow descrevendo um insight e ligando-o a uma ou mais IAs cadastradas;
4. gerar um passo a passo a partir desse insight;
5. reabrir o workflow depois e encontrar o roteiro salvo.

## 13. Entregas sugeridas (ordem)

1. Shell do site: Wally Hub + aba Workflows.
2. CRUD de cards de IA (incluindo status ativo).
3. CRUD de workflows (insight + ferramentas).
4. Geração e persistência do passo a passo.
5. Polimento: filtros, estados vazios, referências quebradas, copy.

## 14. Decisões em aberto

Registrar aqui quando forem fechadas:

- Stack (Vanilla CSS/JS moderno ou Next.js/Vite) e onde os dados moram (local vs. backend leve).
- Se a geração do passo a passo usa um modelo de IA real ou um gerador baseado em regras no primeiro corte.
- Catálogo pré-preenchido de ferramentas vs. nome 100% livre.
- Autenticação do próprio Wally (login) no MVP ou depois.

---

*Escopo inicial do produto Wally (antigo `ai-hub`). Atualizar este arquivo quando o produto mudar de direção.*
