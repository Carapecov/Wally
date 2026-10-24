# Protocolo de Escalonamento e Gestão de Conflitos

### 1. Gestão de Divergências entre Núcleos
Quando houver divergência de posicionamento, premissas ou métodos entre agentes ou núcleos:

1. **Registro Objetivo:** Cada lado registra formalmente sua afirmação, a evidência em que se baseia e o impacto identificado.
2. **Classificação:** O responsável pelo projeto avalia se a divergência é:
   - Factual (resolvível por teste ou checagem de fontes);
   - Técnica (resolvível por prova de conceito ou arquitetura);
   - Legal / Regulatória (requer recomendação de Legislação);
   - Financeira (requer análise de custo-benefício);
   - De preferência / produto (requer alinhamento de escopo).
3. **Teste Rápido:** Busca-se uma verificação adicional ou teste enxuto quando isso puder dirimir a incerteza.
4. **Escalonamento Humano:** Persistindo a divergência, o tema é levado imediatamente ao **Responsável Humano**.
5. **Registro de Risco Residual:** A decisão final e quaisquer riscos aceitos são arquivados em `decisoes/`.

### 2. Gatilhos de Escalonamento Humano Obrigatório
Nenhum agente tem autorização para decidir autonomamente sobre:
- Gastos, orçamentos, compromissos financeiros ou contratação de ferramentas pagas.
- Interpretações legais vinculantes ou termos de uso.
- Aceitação de vulnerabilidades críticas ou riscos de vazamento de dados.
- Publicação externa para usuários finais em ambientes de produção.
- Armazenamento ou manipulação de credenciais e dados pessoais sensíveis.
