# AWS Certified AI Business Strategist (AIB-C01)

Certificação da categoria **Business**, nova na AWS. Valida a capacidade de traduzir capacidades de AI em resultado de negócio, estabelecer práticas de responsible AI e levar a adoção de AI para escala. O foco é **decisão estratégica, não implementação técnica**: não exige código nem experiência prática em AWS.

Público-alvo segundo o exam guide: quem avalia, patrocina ou escala iniciativas de AI na própria empresa ou para clientes, trabalhando ao lado de times técnicos sem construir as soluções. A AWS recomenda cerca de 6 meses de experiência junto a times que adotam AI.

- Trilha de estudo: [study-plan.md](study-plan.md)
- Histórico de simulados: [progress.md](progress.md)
- Banco de questões: [practice/](practice/)

## Formato da prova

| | Beta (a partir de 29/09/2026) | General availability |
|---|---|---|
| Questões | 85 | 60 |
| Duração | 170 min (2 min por questão) | 130 min (~2 min 10 s por questão) |
| Preço | USD 50 | USD 100 |

- Questões de cenário: a prova pede uma decisão, não uma definição decorada.
- **Multiple choice**: 1 correta entre 4. **Multiple response**: 2 ou mais corretas entre 5 ou mais, e só pontua se acertar todas.
- Sem penalidade por chute; questão em branco conta como erro. Nunca deixar em branco.
- Nota de 100 a 1.000, **aprovação com 700**. Scoring compensatório: não precisa passar em cada domínio, só no total.
- Pearson VUE, presencial ou online com fiscal ao vivo. Inglês e japonês no beta. Validade de 3 anos.
- No beta, o resultado costuma sair só depois que o período beta fecha (prática padrão dos betas da AWS; confirmar nas [Before Testing policies](https://aws.amazon.com/certification/policies/before-testing/)).

## Domínios e pesos

| # | Domínio | Peso | Questões no simulado GA / beta | Notas | Banco |
|---|---|---|---|---|---|
| 1 | AI Fundamentals and Literacy | 24% | 15 / 20 | [notes/d1](notes/d1-ai-fundamentals.md) | [practice/d1](practice/d1.md) |
| 2 | AI Strategy and Business Value Creation | **28%** | 17 / 24 | [notes/d2](notes/d2-strategy-and-value.md) | [practice/d2](practice/d2.md) |
| 3 | AI Governance and Responsible AI Leadership | 24% | 14 / 21 | [notes/d3](notes/d3-governance-and-responsible-ai.md) | [practice/d3](practice/d3.md) |
| 4 | Business Readiness, Leadership, and AI Transformation | 24% | 14 / 20 | [notes/d4](notes/d4-readiness-and-transformation.md) | [practice/d4](practice/d4.md) |

As tasks e skills de cada domínio estão no topo de cada nota, com os IDs do exam guide (ex.: Skill 2.2.3), que são os mesmos usados para marcar as questões.

## O que cai e o que não cai

**Serviços e ferramentas AWS no escopo, sempre em nível estratégico:**

- Amazon Bedrock: plataforma de GenAI, pricing tiers, Guardrails, Knowledge Bases.
- Amazon SageMaker AI: ML customizado, e quando usar solução gerenciada ou customizada.
- Amazon Quick: assistentes de negócio com AI (categoria Business Intelligence).
- AWS Cloud Adoption Framework (AWS CAF), para planejar e escalar AI na organização.
- AWS shared responsibility model aplicado a workloads de AI.
- AWS Well-Architected Framework, Responsible AI Lens.
- Estruturas de preço de AI (consumption-based, instance-based, seat-based), Savings Plans, AWS Pricing Calculator, AWS Cost Explorer e AWS Marketplace (decisões build-buy-partner).

**Fora do escopo:** programar modelos, data engineering ou feature engineering, hyperparameter tuning, montar pipelines e infraestrutura, análise estatística de modelos, implementar protocolos de segurança, configurar ou administrar serviços AWS, escolher algoritmos ou arquiteturas, preparar ou rotular dados, operar sistemas de AI em produção.

> Consequência prática: numa questão de cenário, a alternativa que manda "ajustar hiperparâmetros", "reescrever o pipeline" ou "configurar a infraestrutura" quase sempre é o distrator. A resposta certa é a decisão de negócio, de governança ou de sequência.

## Datas e metas

| Item | Data |
|---|---|
| Abertura do beta | 29/09/2026 |
| Early Adopter badge, para quem certificar até | 15/02/2027 (fonte não oficial, confirmar na página do exame) |
| Kickoff do evento de readiness | _preencher_ |
| Prova agendada | _preencher_ (o evento recomenda 2 a 3 semanas após o kickoff) |

**Voucher do evento:** quem completar mais de 50% do learning plan até a última semana do evento e assistir a mais de uma sessão ao vivo pode receber um voucher (sujeito a termos e estoque).

**Depois de passar:** adicionar o e-mail usado na prova em *AWS Training and Certification badges*, no perfil do Skill Builder, para a certificação contar para o empregador como AWS Partner.

## Fontes

Oficiais e públicas:

- [Exam guide AIB-C01 (HTML)](https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html) e [PDF](https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.pdf)
- [Technologies and concepts](https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html) e [In-scope services](https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html)
- AWS Skill Builder: learning plan *AWS AI Business Strategist* (grátis) e *Exam Prep Plan: AWS Certified AI Business Strategist* (exige assinatura)
- Evento AWS Partner Certification Readiness: participant guide, slides do kickoff e das sessões semanais (material confidencial, só em `_raw/`)

Não oficiais, para simulados extras: [Tutorials Dojo](https://tutorialsdojo.com/aib-c01-aws-certified-ai-business-strategist-study-guide/), [Whizlabs](https://www.whizlabs.com/blog/aib-c01-exam-overview/).
