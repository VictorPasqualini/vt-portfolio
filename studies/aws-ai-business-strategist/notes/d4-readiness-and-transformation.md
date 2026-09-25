# Domínio 4: Business Readiness, Leadership, and AI Transformation (24%)

**Fontes:** **[guia]** exam guide oficial · **[kickoff]** slides do kickoff · **[sessão]** sessão ao vivo do evento · **[curso]** curso do Skill Builder · **[complemento]** conhecimento geral, ainda a confirmar contra o curso.

**Cursos deste domínio:** Assess Business AI Readiness and Maturity (4.1) · Establish Data and Infrastructure Foundations for AI (4.2) · Lead Enterprise-Wide Change and Build AI-Ready Workforce Capabilities (4.3) · Scale AI from Pilots to Enterprise-wide Deployments (4.4)

## O que o exam guide cobra [guia]

| Task | Skills |
|---|---|
| **4.1** Assess AI readiness and maturity | 4.1.1 dimensões de prontidão (alinhamento da liderança, qualidade de dados, cultura, infraestrutura, governança) · 4.1.2 modelos de maturidade (da experimentação à escala corporativa) · 4.1.3 lacunas em pessoas, processos, tecnologia e governança · 4.1.4 priorizar investimentos e caminhos de evolução |
| **4.2** Establish data and infrastructure foundations | 4.2.1 prontidão de dados e silos · 4.2.2 estratégia de dados, ownership e compartilhamento · 4.2.3 requisitos de infraestrutura |
| **4.3** Lead change and build workforce capabilities | 4.3.1 patrocínio executivo e AI champions · 4.3.2 times multidisciplinares com accountability · 4.3.3 comunicação transparente · 4.3.4 barreiras culturais · 4.3.5 desenvolvimento das pessoas (programas de POC, hackathons, treinamento, treinamento em RAI) · 4.3.6 transição de papéis para supervisão humana, equilibrando forças humanas e de AI |
| **4.4** Scale AI from pilots to enterprise | 4.4.1 fases iterativas (envision, experiment, launch, scale) · 4.4.2 começar por ganhos de curto prazo · 4.4.3 AI CoE · 4.4.4 mecanismos de feedback e métricas de sucesso · 4.4.5 de experimental a production-grade · 4.4.6 continuidade e desempenho ao escalar |

---

## Task 4.1: prontidão e maturidade

### Dimensões de prontidão (4.1.1) [guia] [complemento]

| Dimensão | Pergunta de diagnóstico |
|---|---|
| Alinhamento da liderança | a diretoria concorda sobre por que investir em AI e patrocina de verdade? |
| Qualidade de dados | os dados necessários existem, são confiáveis e acessíveis? |
| Cultura | as pessoas experimentam, aceitam errar e confiam em dados? |
| Infraestrutura | há plataforma, segurança e integração para rodar AI? |
| Governança | há políticas, donos e processo de aprovação de risco? |

A prontidão é limitada pela dimensão mais fraca: tecnologia de ponta não compensa dados ruins ou liderança desalinhada.

### Modelos de maturidade (4.1.2) [complemento]

Os nomes mudam de framework para framework; a progressão é a mesma:

1. **Experimentação**: iniciativas isoladas, POCs, sem estratégia comum.
2. **Pilotos**: alguns casos com dono e métrica, primeiras políticas.
3. **Operacional**: casos em produção, plataforma e governança compartilhadas.
4. **Escala corporativa**: AI integrada aos processos centrais, portfólio gerido, CoE.
5. **Transformacional**: AI muda o modelo de negócio.

Na prova, o passo certo é o **próximo nível**, não pular para o último. Empresa em experimentação não precisa de uma plataforma corporativa completa; precisa de estratégia, donos e dois ou três pilotos com métrica.

### Lacunas e priorização (4.1.3, 4.1.4) [guia] [complemento]

- Avaliar as lacunas em quatro eixos: **pessoas** (skills, liderança), **processos** (como se decide, aprova e opera), **tecnologia** (dados, plataforma) e **governança** (políticas, risco).
- Priorizar a lacuna que **bloqueia** os casos de maior valor. Se o caso prioritário depende de dados de clientes espalhados em cinco sistemas, a integração desses dados vem antes de qualquer modelo.
- Montar um roadmap em etapas, com metas de maturidade por período.

---

## Task 4.2: fundações de dados e infraestrutura

### Prontidão de dados e silos (4.2.1) [complemento]

- Dado em silo (cada área com o seu, formatos diferentes, sem catálogo) é a barreira mais comum para escalar AI.
- Prontidão de dados: disponibilidade, qualidade, acesso governado, documentação (catálogo, linhagem) e base legal para o uso.
- Para GenAI entra o dado não estruturado: documentos, wikis, chamados. Estão atualizados? Quem é o dono? Quem pode ver?

### Estratégia, ownership e compartilhamento (4.2.2) [complemento]

- **Data owner**: responde pelo dado no negócio e decide quem acessa. **Data steward**: cuida da qualidade e das definições no dia a dia.
- Frameworks de compartilhamento: catálogo central, dados tratados como produto (data products, data mesh), políticas de acesso, acordos de compartilhamento entre áreas e com parceiros.
- A estratégia de dados serve à estratégia de AI: priorizar os dados que alimentam os casos de maior valor, não "arrumar todos os dados antes de começar".

### Infraestrutura (4.2.3) [complemento]

- Requisitos: capacidade de computação, escalabilidade, segurança, integração com os sistemas existentes, monitoramento e controle de custos.
- Serviços gerenciados (Bedrock, por exemplo) reduzem o esforço de infraestrutura e aceleram o tempo até o valor. Infraestrutura própria só se justifica com requisito específico.
- Os detalhes de implementação estão fora do escopo. A prova cobra a decisão, não a configuração.

---

## Task 4.3: mudança e pessoas

### Patrocínio e champions (4.3.1) [guia] [complemento]

- **Executive sponsor**: dá direção, orçamento e remove bloqueios. Sem patrocínio real, a iniciativa morre no piloto.
- **AI champions**: pessoas das áreas de negócio que experimentam primeiro, ajudam os colegas e trazem feedback. Espalham a adoção de forma orgânica, de colega para colega.

### Times multidisciplinares (4.3.2) [complemento]

Negócio, dados, tecnologia, jurídico e compliance, e usuários finais no mesmo time, com um dono de negócio que responde pelo resultado. Projeto de AI tocado só pela TI tende a resolver o problema errado ou a não ser adotado.

### Comunicação transparente (4.3.3) [complemento]

Dizer o que muda, por que muda, o que significa para o trabalho de cada um e como vai ser o apoio. Comunicar cedo, e em mão dupla, com canal para dúvidas e feedback. Silêncio sobre o impacto no emprego alimenta boato e resistência.

### Barreiras culturais (4.3.4) [complemento]

Medo de perder o emprego, desconfiança nas saídas da AI, aversão a risco, silos entre áreas, "não foi inventado aqui", falta de tempo para aprender. A resposta combina envolver as pessoas no desenho, mostrar ganhos concretos, treinar e deixar claro o papel humano. Impor por decreto não funciona.

### Desenvolvimento das pessoas (4.3.5) [guia] [complemento]

- **Programas de POC** e **hackathons**: aprender fazendo, gerar ideias de caso de uso vindas das áreas.
- **Treinamento por perfil**: executivos (estratégia, risco), gestores (casos de uso, mudança), usuários (uso diário, prompt), técnicos (construção).
- **Treinamento em responsible AI** para todos, não só para o time técnico.
- Medir o efeito: adoção, proficiência, casos de uso propostos.

### Transição de papéis (4.3.6) [guia] [complemento]

- Tarefas repetitivas passam para a AI; as pessoas passam a **supervisionar, validar e tratar exceções**.
- Equilibrar forças: AI traz escala, velocidade e consistência; pessoas trazem julgamento, empatia, contexto, criatividade e responsabilidade.
- Planejar requalificação (reskilling e upskilling) junto com a mudança, não depois dela.

---

## Task 4.4: escalar de piloto para a empresa

### Fases iterativas (4.4.1) [guia] [complemento]

O exam guide usa **envision, experiment, launch, scale**. O AWS Cloud Adoption Framework (AWS CAF) usa **Envision, Align, Launch, Scale**. Confirmar no curso qual sequência a prova adota.

| Fase | O que acontece |
|---|---|
| Envision | identificar e priorizar oportunidades ligadas a resultados de negócio |
| Experiment (ou Align) | validar hipóteses com POCs; alinhar stakeholders e lacunas de capacidade |
| Launch | pilotos em produção entregando valor mensurável |
| Scale | expandir para mais áreas, processos e usuários |

É um ciclo: cada escala gera novas oportunidades para o próximo envision.

**AWS CAF**, seis perspectivas [complemento]: Business, People, Governance (visão de negócio) e Platform, Security, Operations (visão técnica). Útil como checklist de prontidão.

### Ganhos de curto prazo (4.4.2) [complemento]

Começar por casos de valor visível, risco baixo e dados disponíveis. Ganhos rápidos criam credibilidade, patrocínio e aprendizado para os casos maiores. Um primeiro projeto de dois anos com risco alto é o distrator.

### AI Center of Excellence (4.4.3) [complemento]

- Define padrões, boas práticas, componentes reutilizáveis e guardrails; oferece capacitação e apoio às áreas; acompanha o portfólio.
- **Hub-and-spoke**: o CoE central (hub) dá padrão e plataforma; as áreas de negócio (spokes) executam os próprios casos. Equilibra controle com velocidade.
- O CoE habilita, não centraliza toda a execução. Virar gargalo é sinal de desenho errado.

### Feedback e métricas de sucesso (4.4.4) [complemento]

Coletar o feedback dos usuários (avaliação das respostas, pesquisas, sinais de uso) e alimentar o ciclo de melhoria. Métricas de sucesso definidas antes do piloto, com baseline (ver [notes/d2](d2-strategy-and-value.md)).

### De experimental a production-grade (4.4.5) [guia] [complemento]

- **Pilot purgatory**: pilotos que funcionam e nunca chegam à produção. Causas típicas: sem dono de negócio, sem métrica de sucesso, sem orçamento para operar, sem integração ao processo real, sem aprovação de risco.
- Production-grade exige: confiabilidade e SLAs, segurança, monitoramento, suporte e operação, custo validado em escala, governança aprovada e integração ao processo e aos sistemas.

### Continuidade ao escalar (4.4.6) [complemento]

Rollout gradual (por área, região ou percentual de usuários), fallback para o processo anterior, capacidade planejada, monitoramento de desempenho e de custo durante a expansão, e plano de rollback.

---

## Pegadinhas de prova

- O próximo passo de maturidade, não o último.
- Priorizar a lacuna que bloqueia o caso de maior valor.
- Sem executive sponsor real, a iniciativa não escala.
- Mudança por decreto e silêncio sobre empregos aumentam a resistência.
- Começar por ganho rápido e visível, não pelo projeto mais ambicioso.
- O CoE habilita e dá padrão; não executa tudo sozinho.
- Piloto sem dono, métrica e orçamento de operação fica preso no pilot purgatory.
- Treinamento em RAI é para todos.

## Pendências

- [ ] Assess Business AI Readiness and Maturity: confirmar o modelo de maturidade usado no curso
- [ ] Establish Data and Infrastructure Foundations for AI: conteúdo do curso ainda não recebido
- [ ] Lead Enterprise-Wide Change and Build AI-Ready Workforce Capabilities: conteúdo do curso ainda não recebido
- [ ] Scale AI from Pilots to Enterprise-wide Deployments: confirmar a sequência de fases (experiment ou align)
