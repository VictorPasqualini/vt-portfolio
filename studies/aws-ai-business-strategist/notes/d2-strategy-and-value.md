# Domínio 2: AI Strategy and Business Value Creation (28%)

**O domínio de maior peso.** Cerca de 24 questões no beta e 17 no GA.

**Fontes:** **[guia]** exam guide oficial · **[kickoff]** slides do kickoff · **[sessão]** sessão ao vivo do evento · **[curso]** curso do Skill Builder · **[complemento]** conhecimento geral, ainda a confirmar contra o curso.

**Cursos deste domínio:** Develop AI Strategies That Align with Business Objectives (2.1) · Measure and Demonstrate AI Business Value (2.2) · Position AI for Competitive Advantage (2.3)

## O que o exam guide cobra [guia]

| Task | Skills |
|---|---|
| **2.1** Develop AI strategies aligned with business objectives | 2.1.1 casos de uso de alto impacto por área (customer operations, sales and marketing, R&D, software development) · 2.1.2 build, buy ou partner (orçamento, prazo, capacidades, propostas de fornecedor, compliance) · 2.1.3 priorizar por valor, viabilidade, sustentabilidade e alinhamento (escalar, pausar, encerrar) · 2.1.4 quando AI não é apropriada · 2.1.5 transição (continuidade do negócio, custo, prontidão de dados, desempenho) |
| **2.2** Measure and demonstrate AI business value | 2.2.1 KPIs tangíveis e intangíveis · 2.2.2 baseline · 2.2.3 frameworks de ROI · 2.2.4 leading indicators · 2.2.5 controle de custos |
| **2.3** Position AI for competitive advantage | 2.3.1 cenário competitivo · 2.3.2 transformação do modelo de negócio · 2.3.3 vantagem competitiva sustentável · 2.3.4 nível de investimento pela maturidade do setor |

---

## Task 2.1: estratégia alinhada ao negócio

### Começar pelo problema, não pela tecnologia [complemento]

A resposta certa quase sempre parte de um **objetivo de negócio mensurável** (reduzir churn, cortar tempo de atendimento, acelerar o fechamento contábil) e chega à AI como meio. Alternativas do tipo "adotar GenAI porque o concorrente adotou" ou "escolher o modelo mais avançado primeiro" são distratores.

### Casos de uso por área (2.1.1) [complemento]

| Área | Casos típicos de alto impacto |
|---|---|
| Customer operations | assistente de atendimento, resumo de chamados, roteamento, agent assist para o atendente humano |
| Sales and marketing | personalização, geração de conteúdo de campanha, qualificação de leads, propostas |
| R&D | síntese de literatura e patentes, geração de hipóteses, aceleração de design |
| Software development | assistentes de código, testes, documentação, modernização de legado |
| Back office | extração de documentos, conciliação, análise de contratos, busca em conhecimento interno |

Alto impacto costuma combinar volume alto, tarefa repetitiva com muito texto e um custo claro do jeito atual.

### Build, buy ou partner (2.1.2) [guia] [complemento]

| Opção | Quando | Na AWS |
|---|---|---|
| **Buy** | necessidade comum, não diferencia o negócio, precisa de valor rápido | SaaS pronto, AWS Marketplace, Amazon Quick |
| **Build** | diferencial competitivo, dados proprietários, requisito que nada no mercado atende, time capaz | Bedrock (sobre FMs) ou SageMaker AI (modelo próprio) |
| **Partner** | falta capacidade interna ou prazo, mas o caso é estratégico | AWS Partners, integradores |

Critérios que o guia lista: orçamento, prazo, capacidades internas, avaliação de propostas de fornecedor e compliance regulatório. Build não é sempre "do zero": construir sobre um FM gerenciado no Bedrock é o meio-termo típico.

Ao avaliar uma proposta de fornecedor, olhar: uso dos dados da empresa (vão treinar o modelo do fornecedor?), onde os dados ficam, SLAs, lock-in e portabilidade, custo total ao escalar, certificações (ISO/IEC 42001, SOC) e indenização de IP.

### Priorização (2.1.3) [guia] [complemento]

- Critérios do guia: **valor**, **viabilidade** (técnica, de dados, de organização), **sustentabilidade** (custo e manutenção ao longo do tempo) e **alinhamento** à estratégia.
- Ferramenta clássica: matriz de valor por viabilidade. Alto valor com alta viabilidade: começar por aí. Alto valor com baixa viabilidade: investir nas fundações antes. Baixo valor: descartar ou deixar para depois.
- O portfólio é revisado de tempos em tempos, com três saídas possíveis: **escalar** (metas batidas), **pausar** (potencial real, mas bloqueado por dados, custo ou adoção) ou **encerrar** (sem caminho para o valor). Encerrar um piloto que não entrega é boa governança, não fracasso.

### Quando AI não é apropriada (2.1.4) [complemento]

- Uma regra ou um processo simples resolve (1.2.1).
- Não há dados, ou os dados são ruins demais e corrigir custa mais que o benefício.
- O erro é inaceitável e não dá para ter revisão humana.
- A decisão exige explicação total que o modelo não consegue dar (alguns casos regulados).
- O custo supera o valor, ou o volume é baixo demais para compensar.
- Não existe um problema de negócio claro: é "AI por AI".

### Transição (2.1.5) [guia] [complemento]

Ao trocar o processo atual por AI: manter **continuidade** (rodar em paralelo, fallback para o processo antigo, rollout gradual), comparar o **custo** total, confirmar a **prontidão dos dados** e garantir que o **desempenho** fica no mínimo igual ao baseline. Desligar o processo antigo no primeiro dia é o distrator.

---

## Task 2.2: medir e demonstrar valor

### KPIs (2.2.1) [sessão] [complemento]

- **Tangíveis**: redução direta de custo, ganho de produtividade (horas liberadas, tempo por tarefa), receita incremental, redução de erros.
- **Intangíveis**: satisfação do cliente, engajamento dos funcionários, agilidade, qualidade de decisão, marca. Entram no business case, mas não sustentam o ROI sozinhos.
- Um KPI bom tem dono, baseline, meta e prazo, e mede o resultado de negócio, não a métrica técnica. Acurácia do modelo não é KPI de negócio; taxa de resolução no primeiro contato é.

### Baseline (2.2.2) [complemento]

Sem medir o estado atual **antes** do piloto, não há como provar ganho depois. Se a pergunta diz que o piloto terminou e ninguém consegue demonstrar valor, a causa quase sempre é a falta de baseline. Medir o baseline é o primeiro passo do plano de medição.

### ROI (2.2.3) [sessão]

**ROI = (benefícios totais − custos totais) ÷ custos totais × 100**

- Benefícios tangíveis: economia direta, ganho de produtividade, ganhos indiretos.
- Benefícios intangíveis: satisfação, engajamento, agilidade.
- **Custos ocultos** que costumam ficar fora da conta: retreino, manutenção e integração.

Exemplo próprio: o projeto custa USD 400 mil no primeiro ano (licença, integração, treinamento das pessoas, monitoramento) e gera USD 600 mil de benefício. ROI = (600 − 400) ÷ 400 × 100 = **50%**. Se a integração que ficou fora do orçamento custar mais USD 100 mil, o ROI cai para (600 − 500) ÷ 500 × 100 = 20%.

Complementos [complemento]: **payback period** (em quanto tempo o investimento se paga), **TCO** (custo total de propriedade, incluindo operação e governança) e **cost avoidance** (custo que deixa de existir, como contratações evitadas).

### Leading indicators (2.2.4) [complemento]

- **Leading**: sinais antecipados de que o valor vai vir. Adoção, usuários ativos, frequência de uso, taxa de aceitação das sugestões da AI, satisfação dos usuários internos.
- **Lagging**: o resultado final, que aparece depois. Receita, custo, churn.
- Nas primeiras semanas de um rollout, o que se acompanha são os leading indicators, porque os lagging ainda não se moveram. Adoção baixa cedo é sinal de alerta: o ROI não vai aparecer.

### Controle de custos (2.2.5) [guia] [complemento]

- Escolher o modelo de preço certo para o padrão de uso (ver a tabela de preços em [notes/d1](d1-ai-fundamentals.md)).
- Escolher o **menor modelo que resolve** a tarefa: modelo maior custa mais por token.
- Reduzir tokens: prompts enxutos, RAG em vez de colar documentos inteiros, cache de respostas repetidas.
- Ferramentas AWS no escopo: **AWS Pricing Calculator** (estimar antes), **AWS Cost Explorer** (acompanhar depois), **Savings Plans** (compromisso de uso por desconto), budgets e alertas, tags de custo por projeto.

---

## Task 2.3: vantagem competitiva

### Cenário competitivo e modelo de negócio (2.3.1, 2.3.2) [complemento]

- Mapear como concorrentes e entrantes usam AI, e onde a AI ameaça o modelo atual.
- Transformar o modelo de negócio vai além de ser mais eficiente: é criar produto ou serviço novo com AI, mudar como a receita é gerada ou como o cliente é atendido.

### Vantagem sustentável (2.3.3) [complemento]

- O modelo em si **não é diferencial**: foundation models estão disponíveis para todos. O que é difícil de copiar: **dados proprietários**, integração profunda aos processos, conhecimento de domínio, relação com o cliente, a velocidade de aprendizado da organização e o flywheel de dados (mais uso gera mais dado, que melhora o produto, que gera mais uso).
- Na prova, "usar o modelo mais avançado do mercado" é vantagem temporária. "Combinar dados proprietários com o processo central do negócio" é vantagem sustentável.

### Investimento pela maturidade do setor (2.3.4) [complemento]

- Setor com adoção ainda baixa: espaço para ser *first mover*, com mais risco e mais recompensa, ou para ser *fast follower* e aprender com os erros dos outros.
- Setor com adoção alta: AI deixa de ser diferencial e vira requisito para competir; o investimento defende a posição.
- Setor muito regulado: investir primeiro em governança e em casos de menor risco.

---

## Pegadinhas de prova

- Piloto sem baseline não prova valor. Baseline antes, sempre.
- Acurácia do modelo não é KPI de negócio.
- Adoção é o leading indicator mais comum; receita é lagging.
- Custos ocultos: retreino, manutenção e integração.
- "O melhor modelo" não é vantagem sustentável; dados proprietários e integração ao processo são.
- Encerrar um piloto sem caminho para valor é a resposta certa, não um fracasso.
- A resposta começa pelo objetivo de negócio, não pela tecnologia.

## Pendências

- [ ] Develop AI Strategies That Align with Business Objectives: conteúdo do curso ainda não recebido
- [ ] Measure and Demonstrate AI Business Value: até agora só o slide de ROI da sessão
- [ ] Position AI for Competitive Advantage: conteúdo do curso ainda não recebido
