# Domínio 3: AI Governance and Responsible AI Leadership (24%)

**Fontes:** **[guia]** exam guide oficial · **[kickoff]** slides do kickoff · **[sessão]** sessão ao vivo do evento · **[curso]** curso do Skill Builder · **[complemento]** conhecimento geral, ainda a confirmar contra o curso.

**Cursos deste domínio:** Responsible AI Principles and Dimensions (3.1) · AI Governance Structures and Regulatory Compliance (3.2) · AI Risk Controls and Mitigation Strategies (3.3)

## O que o exam guide cobra [guia]

| Task | Skills |
|---|---|
| **3.1** Apply responsible AI principles | 3.1.1 princípios (fairness, explainability, privacy, safety, transparency, robustness) · 3.1.2 tradeoffs entre eles · 3.1.3 governance by design · 3.1.4 supervisão humana e salvaguardas (detecção de alucinação, guardrails, critérios de escalonamento) |
| **3.2** Establish AI governance and compliance | 3.2.1 governança multidisciplinar com responsabilidades claras · 3.2.2 compliance regulatório · 3.2.3 controle de acesso e segurança de dados · 3.2.4 frameworks de classificação de risco |
| **3.3** Manage AI risks and controls | 3.3.1 controles e monitoramento em produção · 3.3.2 viés ao longo do ciclo de vida e bias drift · 3.3.3 conteúdo nocivo e propriedade intelectual · 3.3.4 confiabilidade (alucinação, degradação de dados, model drift) |

---

## Task 3.1: princípios de responsible AI

### Princípios (3.1.1) [guia] [complemento]

O exam guide lista seis. A AWS costuma apresentar **oito dimensões** de responsible AI; confirmar a lista exata no curso.

| Dimensão | Em uma frase |
|---|---|
| **Fairness** | resultados que não prejudicam grupos de pessoas de forma injusta |
| **Explainability** | conseguir entender e explicar por que o sistema deu aquela saída |
| **Privacy and security** | dados protegidos e usados só para o fim autorizado |
| **Safety** | evitar saídas e usos que causem dano |
| **Controllability** | ter mecanismos para monitorar e direcionar o comportamento do sistema |
| **Veracity and robustness** | saídas corretas mesmo com entradas inesperadas ou adversárias |
| **Governance** | práticas que definem, implementam e fazem cumprir o uso responsável |
| **Transparency** | dar às partes interessadas informação para decidirem sobre o uso (inclusive saber que estão falando com uma AI) |

Explainability é sobre *por que o modelo decidiu isso*. Transparency é sobre *o que o sistema é, como foi feito e onde está sendo usado*. A prova gosta de separar as duas.

Artefatos AWS relacionados [complemento]: **AWS AI Service Cards** (documentação de uso pretendido e limites de serviços da AWS) e o **Responsible AI Lens** do AWS Well-Architected Framework (que está no escopo).

### Tradeoffs (3.1.2) [complemento]

| Tensão | Exemplo |
|---|---|
| Acurácia × explainability | modelo complexo mais preciso, mas difícil de explicar a um regulador ou a um cliente com crédito negado |
| Privacidade × personalização | quanto mais dado pessoal, melhor a recomendação e maior o risco |
| Safety × utilidade | filtros rígidos demais bloqueiam pedidos legítimos |
| Fairness × acurácia geral | corrigir disparidade entre grupos pode reduzir a métrica global |
| Velocidade × supervisão | revisão humana reduz risco e aumenta tempo e custo |

Não existe resposta universal: a decisão depende do risco do caso de uso. O que a prova espera é que o tradeoff seja **explícito, documentado e aprovado** por quem responde por ele, não escondido.

### Governance by design (3.1.3) [complemento]

Responsible AI entra **desde o desenho** do caso de uso: avaliação de risco na ideação, requisitos de fairness e privacidade definidos antes de construir, critérios de aceite que incluem RAI. Adicionar governança depois de lançado é mais caro e mais arriscado. Na prova, "revisar RAI depois do go-live" é distrator.

### Supervisão humana e salvaguardas (3.1.4) [guia] [complemento]

- **Human-in-the-loop (HITL)**: um humano aprova antes de a decisão ter efeito. Para decisão de alto impacto: crédito, contratação, saúde, jurídico.
- **Human-on-the-loop (HOTL)**: o sistema age sozinho e um humano monitora, com poder de intervir. Para volume alto e risco moderado.
- **Human-out-of-the-loop**: totalmente automático. Só para baixo risco.
- **Detecção de alucinação**: checar a resposta contra as fontes (grounding), exigir citação, amostragem com revisão humana.
- **Guardrails**: no Amazon Bedrock, os **Guardrails** oferecem filtros de conteúdo nocivo, tópicos proibidos (denied topics), filtro e mascaramento de PII, filtro de palavras, contextual grounding checks e automated reasoning checks [complemento, confirmar no curso].
- **Critérios de escalonamento**: quando passar para um humano. Confiança baixa, tema sensível, alto valor financeiro, cliente insatisfeito, pedido explícito do cliente, caso fora do escopo.

---

## Task 3.2: governança e compliance

### Estrutura de governança (3.2.1) [complemento]

- Um **AI governance council** ou comitê multidisciplinar: negócio, jurídico, compliance, segurança, privacidade, dados, tecnologia, RH.
- **Accountability clara**: cada sistema de AI tem um dono de negócio que responde pelo resultado. Uma matriz RACI evita o "todos são responsáveis, logo ninguém é".
- O comitê define políticas, aprova casos de uso por nível de risco, acompanha incidentes e revisa o portfólio.
- Governança não pode virar gargalo: aprovação rápida para baixo risco e revisão profunda só para alto risco.

### Regulação (3.2.2) [complemento]

- **EU AI Act**, abordagem por risco:
  - **Inaceitável**: proibido. Social scoring por governos, manipulação que causa dano, alguns usos de reconhecimento biométrico.
  - **Alto risco**: exigências pesadas, como gestão de risco, qualidade de dados, documentação, supervisão humana e registro. Crédito, emprego, educação, infraestrutura crítica.
  - **Risco limitado**: obrigação de transparência, como avisar que o usuário fala com um chatbot e identificar conteúdo gerado.
  - **Risco mínimo**: sem obrigação específica (filtro de spam, games).
- Leis de proteção de dados valem para AI: GDPR na Europa, LGPD no Brasil. Mais as regulações do setor (financeiro, saúde).
- Resposta de prova: mapear quais regulações se aplicam **antes** de lançar e acompanhar mudanças, porque a regulação de AI evolui rápido.

### Acesso e segurança de dados (3.2.3) [guia] [complemento]

- Least privilege: cada pessoa, e cada agent, acessa só o que precisa.
- Criptografia, residência de dados, logs de auditoria, classificação de dados sensíveis.
- Um assistente com RAG não pode devolver documentos que o usuário não teria permissão de abrir: as permissões da fonte valem para a resposta.
- **Shared responsibility model aplicado a AI**: a AWS protege a infraestrutura e os serviços; o cliente responde pelos próprios dados, pelo controle de acesso, pela configuração de guardrails e pelo uso que faz das saídas.
- No Amazon Bedrock, prompts e respostas não são usados para treinar os modelos e não são compartilhados com os provedores dos modelos [complemento, confirmar no curso].

### Classificação de risco (3.2.4) [complemento]

Classificar cada caso de uso por impacto e aplicar **controles proporcionais ao risco**:

| Nível | Exemplo | Controles |
|---|---|---|
| Baixo | resumo interno de reuniões | uso aprovado, orientação básica |
| Médio | chatbot de atendimento com FAQ | guardrails, monitoramento, escalonamento para humano |
| Alto | apoio a decisão de crédito | HITL, testes de viés, explainability, documentação, auditoria |
| Proibido | vigilância de funcionários sem base legal | não se faz |

O NIST AI RMF (Govern, Map, Measure, Manage) serve como estrutura do programa de risco (ver [notes/d1](d1-ai-fundamentals.md)).

---

## Task 3.3: riscos e controles

### Controles em produção (3.3.1) [complemento]

Monitoramento contínuo de qualidade, segurança, custo e uso; alertas; plano de resposta a incidentes de AI; auditorias periódicas; capacidade de desligar ou reverter o sistema (kill switch, rollback).

### Viés ao longo do ciclo de vida (3.3.2) [guia] [complemento]

| Fase | Como o viés entra |
|---|---|
| Coleta de dados | histórico que reflete discriminação passada; grupos sub-representados |
| Rotulagem | critérios subjetivos dos rotuladores |
| Treino e avaliação | métrica global esconde erro concentrado num grupo |
| Deploy | uso num público diferente daquele do treino |
| Operação | feedback loops: a saída do modelo influencia os dados futuros |

**Bias drift**: um modelo que era justo no lançamento fica enviesado com o tempo, porque a população ou os dados mudaram. Por isso a checagem de viés é **contínua**, não um teste único antes do go-live. Na AWS, o SageMaker Clarify detecta viés e explica previsões [complemento].

### Conteúdo nocivo e IP (3.3.3) [complemento]

- Conteúdo nocivo: filtros de entrada e de saída, denied topics, proteção contra prompt injection e jailbreak, red teaming antes de lançar.
- Propriedade intelectual: risco de a saída reproduzir conteúdo protegido, dúvida sobre a origem dos dados de treino, dados confidenciais da empresa vazando em ferramentas externas.
- Mitigações: fornecedores com termos claros sobre uso de dados, política interna de uso, revisão humana do conteúdo publicado, e indenização de IP oferecida pelo fornecedor. A AWS oferece indenização de IP para saídas de alguns modelos próprios [a confirmar quais].

### Confiabilidade (3.3.4) [guia] [complemento]

- **Alucinação**: resposta fluente e errada. Mitigar com RAG sobre fontes confiáveis, grounding checks, citação de fonte, revisão humana nos casos de alto impacto e avisos claros ao usuário.
- **Degradação da qualidade dos dados**: fontes que param de ser atualizadas ou mudam de formato. Mitigar com dono de dado e monitoramento de qualidade.
- **Model drift**: ver [notes/d1](d1-ai-fundamentals.md), skill 1.2.3.

---

## Pegadinhas de prova

- Explainability é *por que decidiu*; transparency é *o que o sistema é e onde é usado*.
- Decisão de alto impacto sobre pessoas: HITL. Volume alto e risco moderado: HOTL.
- Checagem de viés é contínua (bias drift), não um teste único.
- Controles proporcionais ao risco: nem tudo precisa de comitê, e alto risco nunca passa sem ele.
- Governança entra no desenho, não depois do lançamento.
- Todo sistema de AI precisa de um dono de negócio que responde por ele.
- Pela shared responsibility, os dados e o uso das saídas são do cliente, não da AWS.

## Pendências

- [ ] Responsible AI Principles and Dimensions: confirmar a lista oficial de dimensões da AWS
- [ ] AI Governance Structures and Regulatory Compliance: conteúdo do curso ainda não recebido
- [ ] AI Risk Controls and Mitigation Strategies: confirmar recursos atuais do Bedrock Guardrails e o escopo da indenização de IP
