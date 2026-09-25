# Domínio 1: AI Fundamentals and Literacy (24%)

**Fontes:** **[guia]** exam guide oficial · **[kickoff]** slides do kickoff · **[sessão]** sessão ao vivo do evento · **[curso]** curso do Skill Builder · **[complemento]** conhecimento geral, ainda a confirmar contra o curso.

**Cursos deste domínio:** Core AI Concepts and Terminology (1.1) · AI Solution Types and Enterprise Considerations (1.2) · Generative AI Concepts and Techniques (1.3)

## O que o exam guide cobra [guia]

| Task | Skills |
|---|---|
| **1.1** Describe core AI concepts and define terminology | 1.1.1 conceitos em contexto de negócio (algorithm, model, training, inference, prediction) · 1.1.2 AI vs ML vs GenAI · 1.1.3 dados estruturados e não estruturados · 1.1.4 por que qualidade de dados importa · 1.1.5 treinar com dados históricos · 1.1.6 frameworks globais e vocabulário (ISO/IEC 23053, ISO/IEC 42001) |
| **1.2** Identify and select appropriate AI solution types | 1.2.1 automação por regras ou AI · 1.2.2 AI agents (autonomy, tool use, agent-to-agent, orchestration) · 1.2.3 monitoramento contínuo e model drift · 1.2.4 classificação de ferramentas (approved, blocked, under evaluation) contra shadow AI |
| **1.3** Apply GenAI concepts and techniques | 1.3.1 prompt engineering · 1.3.2 token limits e context window · 1.3.3 model adaptation (RAG, fine-tuning) |

---

## Task 1.1: conceitos e terminologia

### AI, ML e GenAI (1.1.2) [complemento]

São camadas, uma dentro da outra:

- **AI**: o campo amplo. Sistemas que executam tarefas que normalmente exigiriam inteligência humana. Tecnicamente inclui até sistemas baseados em regras.
- **Machine learning**: o sistema aprende padrões a partir de dados, em vez de seguir regras escritas à mão.
- **Deep learning**: ML com redes neurais de muitas camadas. É a base dos modelos modernos de visão, fala e linguagem.
- **Generative AI**: gera conteúdo novo (texto, imagem, código, áudio) a partir de **foundation models (FMs)**, pré-treinados em volumes enormes de dados e reaproveitáveis em muitas tarefas. Um **LLM** é um FM de linguagem.

Regra prática: *prever, classificar, detectar ou recomendar* a partir do histórico é ML tradicional. *Criar, resumir, conversar, extrair ou transformar* conteúdo é GenAI.

### Vocabulário básico (1.1.1, 1.1.5) [complemento]

| Termo | Em linguagem de negócio |
|---|---|
| Algorithm | a receita de aprendizado (regressão, árvore de decisão, rede neural) |
| Model | o resultado do treino: o artefato que faz as previsões |
| Training | expor o algoritmo a dados históricos para ele aprender padrões |
| Inference | usar o modelo já treinado em dados novos |
| Prediction | a saída da inference (um score, uma classe, um texto gerado) |

- Tipos de aprendizado: **supervised** (dados rotulados, como fraude sim ou não), **unsupervised** (sem rótulo, como segmentação de clientes) e **reinforcement** (aprende por recompensa).
- **Treinar com histórico é aprender o passado.** Se o mundo muda (preços, comportamento, regulação), o modelo perde precisão: é o drift da skill 1.2.3. Se o histórico carrega viés, o modelo reproduz o viés (domínio 3).
- Custo: o treino é um investimento pontual e pesado; a inference é o custo recorrente, que cresce com o uso.

### Dados (1.1.3, 1.1.4) [complemento]

- **Structured**: tabelas com schema (ERP, CRM, transações). **Unstructured**: texto livre, e-mails, contratos em PDF, imagens, áudio, vídeo. **Semi-structured**: JSON, logs.
- O ML tradicional consome principalmente dados estruturados. GenAI é o que destravou o valor dos não estruturados, que são a maior parte do dado de uma empresa.
- Qualidade de dados decide o resultado (*garbage in, garbage out*). Dimensões que a prova pode citar: accuracy, completeness, consistency, timeliness e representativeness. Dado não representativo gera modelo enviesado.

### Padrões e vocabulário global (1.1.6) [sessão] [complemento]

O slide *Four standards and frameworks* da sessão agrupa estes quatro. As descrições abaixo são minhas.

| Norma | O que é | Quando aparece |
|---|---|---|
| **ISO/IEC 42001:2023** | requisitos para um *AI management system*; é **certificável** | compras e auditoria perguntam se a empresa tem |
| **ISO/IEC 23053:2022** | framework que descreve um sistema de AI genérico baseado em ML | vocabulário comum de como um sistema é construído |
| **ISO/IEC 22989:2022** | conceitos e terminologia de AI | o vocabulário unificado em si |
| **NIST AI RMF 1.0** | framework **voluntário** de gestão de risco, com quatro funções: Govern, Map, Measure, Manage | estruturar o próprio programa de risco de AI |

Cada um responde a uma pergunta diferente, e a prova cobra saber qual é qual. Pista: "certificação" e "auditoria" apontam para 42001; "estruturar nosso programa de risco" aponta para NIST AI RMF; "falar a mesma língua entre áreas" aponta para 22989 e 23053.

---

## Task 1.2: tipos de solução

### Regras ou AI (1.2.1) [complemento]

| Automação por regras quando | AI quando |
|---|---|
| a lógica é conhecida, estável e cabe em if/then | o padrão é complexo demais para escrever como regra |
| a entrada é estruturada e previsível | a entrada é não estruturada (texto, imagem, voz) |
| o resultado precisa ser determinístico e auditável linha a linha | há muitas variáveis e exceções |
| o volume de exceções é baixo | o comportamento muda e a solução precisa se adaptar |

Regras são mais baratas, previsíveis e fáceis de explicar. Usar AI onde uma regra resolve é um erro que a prova cobra (ver também 2.1.4).

### AI agents (1.2.2) [complemento]

- **Assistente ou chatbot**: responde a um pedido por vez; quem decide e age é o humano.
- **Agent**: recebe um objetivo e age em direção a ele. Capacidades centrais:
  - **Autonomy**: planeja e executa várias etapas sem um humano guiando cada passo.
  - **Tool use**: chama APIs e sistemas (consulta o CRM, abre um chamado, envia um e-mail).
  - **Memory**: mantém contexto entre etapas e entre interações.
  - **Agent-to-agent communication**: agentes especializados trocando tarefas e resultados.
  - **Orchestration**: um agente supervisor distribui o trabalho entre subagentes, em sequência ou em paralelo.
- Mais autonomia é mais risco. Por isso agents pedem guardrails, permissão mínima nas ferramentas e critérios de escalonamento para humanos (3.1.4). Um bom começo é autonomia baixa em processo de baixo risco, ampliada conforme a confiança cresce.
- Na AWS, o Amazon Bedrock oferece agents gerenciados. _Detalhar com o curso._

### Monitoramento e drift (1.2.3) [complemento]

- Modelos degradam em produção porque o mundo muda. **Data drift**: os dados de entrada mudam de perfil (novo público, novo canal). **Concept drift**: a relação entre entrada e resultado muda (o mesmo comportamento de compra deixa de indicar churn depois de uma mudança de preço).
- Por isso AI não é projeto com data de fim: exige monitoramento contínuo, limites de alerta e retreino. Esse custo recorrente entra no business case (2.2.5).

### Shadow AI (1.2.4) [guia] [complemento]

- **Shadow AI** é o uso, pelos funcionários, de ferramentas de AI não aprovadas, como colar o contrato de um cliente num chatbot público. Riscos: vazamento de dados, violação de compliance e de IP, decisões sem rastreabilidade.
- Resposta esperada: uma **classificação transparente** das ferramentas em *approved*, *blocked* e *under evaluation*, publicada para todos, com um processo para pedir a avaliação de ferramentas novas.
- Só bloquear não funciona: as pessoas usam AI porque precisam dela e migram para o celular pessoal. A resposta forte oferece uma **alternativa aprovada** junto com a orientação de uso.

### Modelos de preço [sessão] [guia]

| Modelo | Como cobra | Comportamento | Exemplo AWS |
|---|---|---|---|
| **Consumption-based** | por chamada, por token | escala junto com o sucesso: o custo acompanha o uso | Amazon Bedrock |
| **Instance-based** | por hora de capacidade | custa o mesmo parado ou em uso | Amazon SageMaker AI |
| **Seat-based** | por pessoa, por período | desperdiçado se ninguém entra | planos do Amazon Quick |

Leitura de prova: uso imprevisível ou piloto começando pede consumption-based. Uso alto e constante pode justificar capacidade dedicada e Savings Plans. Seat-based só compensa com adoção real, então a métrica de adoção vira métrica de custo.

O slide cita as *Amazon Bedrock service tiers* como fonte. _Detalhar os tiers com o curso._

### Os três serviços no escopo, em nível estratégico [guia] [complemento]

- **Amazon Bedrock**: acesso gerenciado, por API, a foundation models de vários provedores, sem gerenciar infraestrutura. Traz **Guardrails** (filtros e controles de conteúdo) e **Knowledge Bases** (RAG gerenciado). É a escolha para GenAI sem construir modelo.
- **Amazon SageMaker AI**: construir, treinar e implantar modelos de ML próprios. Para quando o problema é específico, há dados proprietários e time técnico, e as soluções prontas não atendem.
- **Amazon Quick**: assistentes de AI e BI para usuários de negócio, cobrado por usuário.

---

## Task 1.3: técnicas de GenAI

### Prompt engineering (1.3.1) [curso] [complemento]

Um prompt bom diz a tarefa, dá o contexto, define o público, o formato da saída e as restrições. E é iterado: o primeiro prompt raramente é o final.

Três padrões, em ordem crescente de orientação dada ao modelo [curso]:

| Padrão | O que é | Quando usar |
|---|---|---|
| **Zero-shot** | descreve a tarefa e deixa o modelo executar | tarefas simples e comuns, que o modelo viu muito no treino |
| **Few-shot** | dá dois ou três exemplos de entrada e saída, e o modelo segue o padrão | quando a saída precisa de um estilo ou de uma estrutura específicos |
| **Chain-of-thought** | pede para o modelo raciocinar passo a passo antes de responder | tarefas de raciocínio em etapas, ou que falharam com a abordagem direta |

Exemplos próprios, para um e-mail de cobrança:

- Zero-shot: "Escreva um e-mail curto lembrando o cliente de uma fatura vencida há 10 dias."
- Few-shot: "Estes dois e-mails seguem o tom da empresa: [exemplo 1] [exemplo 2]. Escreva um no mesmo tom para uma fatura vencida há 10 dias."
- Chain-of-thought: "Antes de escrever, liste o histórico de pagamento do cliente e o risco de churn; depois decida o tom e escreva o e-mail."

### Tokens e context window (1.3.2) [complemento]

- **Token** é a unidade que o modelo lê e pela qual cobra: grosso modo, um pedaço de palavra. O preço consumption-based é por token de entrada e de saída.
- **Context window** é o máximo de tokens que o modelo considera numa interação, somando prompt, documentos anexados, histórico da conversa e resposta.
- Sintomas de janela estourada ou saturada: o modelo ignora partes do documento, esquece o começo de uma conversa longa, responde de forma incompleta. Documentos longos também encarecem cada chamada.
- Mitigações: dividir o documento, resumir por partes, ou usar RAG para enviar só os trechos relevantes.

### Model adaptation (1.3.3) [complemento]

Do mais barato e rápido para o mais caro e lento:

| Técnica | O que muda | Resolve |
|---|---|---|
| Prompt engineering | só a instrução | formato, tom, clareza da tarefa |
| **RAG** (Retrieval Augmented Generation) | a cada pergunta, o modelo recebe trechos buscados em fontes da empresa | conhecimento **proprietário e atualizado**, resposta com citação da fonte, menos alucinação |
| **Fine-tuning** | ajusta os pesos do modelo com exemplos rotulados | **comportamento**: estilo, formato, vocabulário de domínio, tarefa especializada |
| Continued pre-training | treina mais o FM com grande volume de texto do domínio | domínio muito específico (jargão técnico, jurídico) |
| Treinar do zero | modelo próprio | raríssimo; custo e dados enormes |

A pergunta clássica: a informação muda com frequência ou precisa de citação? **RAG** (no Bedrock, via Knowledge Bases). O problema é tom, formato ou uma tarefa muito específica? **Fine-tuning**. Fine-tuning não é a forma de manter o modelo atualizado com documentos que mudam toda semana.

---

## Pegadinhas de prova

- AI contém ML, que contém deep learning, que contém GenAI. "Prever demanda" não é GenAI.
- Regra fixa com entrada estruturada: a resposta é automação por regras, não AI.
- Conteúdo que muda sempre, ou resposta que precisa citar a fonte: RAG, não fine-tuning.
- Documento grande "ignorado" pelo modelo: context window, não viés nem drift.
- Shadow AI: classificar e oferecer alternativa aprovada; bloquear tudo é o distrator.
- 42001 é o sistema de gestão certificável; NIST AI RMF é voluntário e estrutura o programa de risco.

## Pendências

- [ ] Core AI Concepts and Terminology: conteúdo do curso ainda não recebido
- [ ] AI Solution Types and Enterprise Considerations: idem; detalhar os Bedrock service tiers e os agents do Bedrock
- [ ] Generative AI Concepts and Techniques: até agora só a tabela de padrões de prompt
