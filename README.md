# Wally

![Wally, mascote do projeto](public/images/Wally.jpeg)

> **Wally é uma camada de inteligência para transformar a complexidade da IA em avanço concreto para empresas.**

O projeto está sendo construído para aproximar pessoas, ferramentas e decisões. Seu valor não está em acumular tecnologia, mas em criar clareza: entender o momento de cada negócio, reduzir a dispersão e conduzir o próximo passo com mais intenção.

<details open>
<summary><strong>Sobre o projeto</strong></summary>

O Wally nasce para resolver um problema que cresce junto com a adoção da inteligência artificial: há cada vez mais ferramentas, possibilidades e informações, mas pouca orientação sobre o que realmente muda o resultado de uma empresa.

O projeto organiza essa complexidade em uma experiência mais humana e acionável. A proposta é ajudar cada pessoa a sair da dúvida para a ação, conectando contexto, prioridade e execução em um único lugar.

O impacto esperado é direto:

- menos tempo perdido escolhendo entre possibilidades;
- mais clareza para decidir o que merece atenção agora;
- mais consistência na transformação de ideias em processos;
- mais capacidade de crescimento sem aumentar a desorganização;
- mais valor extraído das ferramentas que a empresa já possui.

O Wally não está sendo pensado como mais um catálogo de ferramentas. Ele está sendo construído como um ponto de orientação para que a tecnologia produza movimento real.

</details>

<details>
<summary><strong>Ecossistema</strong></summary>

O Wally faz parte de um ecossistema que combina produto, engenharia, conhecimento e governança. Cada camada existe para ampliar o impacto da outra:

- **Experiência:** a interface acolhe, pergunta e orienta para que o primeiro passo seja simples.
- **Aplicação:** o runtime Laravel sustenta autenticação, contexto e os fluxos que transformam intenção em uso.
- **Núcleos de conhecimento:** áreas especializadas ajudam a organizar decisões de desenvolvimento, design, pesquisa, marketing, segurança e operação.
- **Agentes e processos:** papéis, registros e critérios tornam o conhecimento reutilizável e melhoram a qualidade das próximas decisões.
- **Memória do projeto:** documentação e retrospectivas preservam aprendizados para que o ecossistema evolua sem recomeçar do zero.

O resultado desejado é uma rede que aprende com o uso. Quanto melhor o contexto capturado, mais precisa pode ser a orientação; quanto mais clara a orientação, maior a chance de a IA gerar impacto operacional.

O backend TypeScript anterior permanece em `legacy/typescript` como histórico técnico. O fluxo atual da aplicação está estruturado em Laravel.

</details>

<details>
<summary><strong>Estilo</strong></summary>

O estilo do Wally traduz a sua proposta: tecnologia com direção, sem frieza e sem excesso de ruído.

- **Visual:** tons oliva e areia, formas orgânicas e contraste confortável.
- **Tom:** direto, acolhedor e orientado a decisões.
- **Experiência:** menos fricção, mais contexto e um próximo passo evidente.
- **Personalidade:** o Wally funciona como um guia próximo — inteligente o suficiente para organizar a complexidade e humano o suficiente para não transformar tudo em burocracia.

A imagem do Wally representa esse papel: uma presença que acompanha a construção, dá segurança para avançar e mantém o foco no que realmente importa.

</details>

<details>
<summary><strong>O impacto</strong></summary>

O impacto do Wally será medido pela mudança que ele provoca no trabalho, não pela quantidade de funcionalidades que reúne.

O projeto pretende tornar decisões importantes mais rápidas, reduzir o custo da desorganização e permitir que equipes pequenas operem com mais clareza e potência. Na prática, isso significa transformar IA de uma promessa difusa em uma infraestrutura de avanço para o negócio.

O Wally deve ajudar empresas a:

- identificar oportunidades antes que elas se percam no excesso de informação;
- aplicar inteligência artificial em problemas concretos, não apenas em experimentos isolados;
- manter decisões e aprendizados acessíveis ao time;
- criar uma operação mais preparada para crescer;
- liberar energia das pessoas para estratégia, relacionamento e criação de valor.

</details>

<details>
<summary><strong>O que será feito ainda</strong></summary>

O projeto está em evolução. Os próximos avanços serão direcionados a aumentar a utilidade do Wally no dia a dia:

1. **Contexto mais profundo:** transformar as respostas iniciais em uma visão mais precisa do momento, dos objetivos e das restrições de cada negócio.
2. **Conexão com ferramentas:** aproximar o Wally das ferramentas de IA e dos sistemas que já fazem parte da operação.
3. **Recomendações acionáveis:** indicar caminhos, prioridades e próximos passos com base no contexto real, não em sugestões genéricas.
4. **Workflows inteligentes:** levar uma decisão da orientação até a execução, com acompanhamento do que foi feito e do que ainda falta.
5. **Memória do ecossistema:** registrar decisões, aprendizados e resultados para que o projeto se torne mais útil a cada ciclo.
6. **Visão de impacto:** acompanhar ganhos de tempo, qualidade, clareza e capacidade operacional gerados pelo uso do Wally.
7. **Governança e segurança:** ampliar controles, rastreabilidade e proteção para que a evolução aconteça com confiança.

Cada entrega será priorizada pela mesma pergunta: **isso aumenta a capacidade de uma empresa avançar com clareza?**

</details>

<details>
<summary><strong>Estrutura atual</strong></summary>

| Caminho | Responsabilidade |
| --- | --- |
| `app/` | Controllers, requests, modelos e serviços da aplicação |
| `bootstrap/` | Inicialização do Laravel |
| `database/` | Migrações, factories e seeders |
| `ecossistema/` | Governança, núcleos, projetos e memória de trabalho |
| `legacy/typescript/` | Implementação anterior preservada como histórico |
| `public/` | Entrada HTTP, estilos, scripts e imagem do Wally |
| `resources/views/` | Interfaces Blade |
| `routes/` | Rotas web e comandos Artisan |
| `tests/` | Testes automatizados |

</details>

<details>
<summary><strong>Executar localmente</strong></summary>

Requisitos: PHP 8.3+, Composer e SQLite. Para o XAMPP instalado em `C:\xampp2`, as DLLs SQLite podem ser ativadas apenas no processo PHP:

```powershell
cd C:\xampp2\htdocs\ai-hub

$php = 'C:\xampp2\php\php.exe'
$sqlite = @('-d', 'extension=php_pdo_sqlite.dll', '-d', 'extension=php_sqlite3.dll')

composer install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
if (-not (Test-Path database\database.sqlite)) { New-Item -ItemType File database\database.sqlite }

& $php @sqlite artisan key:generate
& $php @sqlite artisan migrate
& $php @sqlite artisan serve
```

Depois, abra [http://127.0.0.1:8000](http://127.0.0.1:8000).

Para habilitar SQLite permanentemente no XAMPP, descomente `extension=pdo_sqlite` e `extension=sqlite3` em `C:\xampp2\php\php.ini`.

</details>

<details>
<summary><strong>Segurança e higiene do repositório</strong></summary>

O `.gitignore` cobre variáveis de ambiente, credenciais, chaves privadas, certificados, bancos locais, dumps, uploads, logs, caches, dependências, builds e arquivos de IDE. Arquivos de exemplo, código-fonte e a imagem pública do projeto permanecem versionáveis.

O `.gitignore` reduz o risco de publicação acidental, mas não substitui uma revisão antes de cada commit. Nunca coloque tokens, senhas ou chaves reais no repositório; se um segredo for exposto, revogue-o e gere outro imediatamente.

</details>

---

Wally está sendo construído para que a inteligência artificial deixe de ser dispersão e se torne capacidade de avanço.
