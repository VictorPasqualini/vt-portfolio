# Roadmap de certificações

As próximas certificações depois da AIB-C01, em ordem, com o que cada prova cobre. Cada uma ganha a própria pasta, no modelo da [AIB-C01](aws-ai-business-strategist/), quando o estudo começar. Até lá, fica só aqui.

Fatos conferidos nas páginas oficiais em 06/10/2026. Formato, preço e versão de prova mudam: confira de novo antes de agendar.

## Ordem sugerida

| # | Certificação | Código | Por que nesta posição |
|---|---|---|---|
| 1 | AWS Certified AI Business Strategist | AIB-C01 | Em estudo |
| 2 | Databricks Certified Data Engineer Associate | (sem código) | Maior sobreposição com a prática do dia a dia (Databricks, Delta Lake, Unity Catalog, camadas bronze/silver/gold) e já vem com o Databricks Fundamentals. É a base da Professional. |
| 3 | Databricks Certified Data Engineer Professional | (sem código) | Aprofunda a Associate. A prova muda em 09/10/2026. |
| 4 | CDMP Associate (DAMA International) | Data Management Fundamentals | Fundamentos de gestão de dados, independentes de fornecedor. Prova com consulta ao DMBoK. |

O CDMP não depende de nenhuma plataforma e pode vir antes das Databricks se modelagem e governança virarem prioridade.

## Competências que o roadmap cobre

| Competência | Onde as provas cobrem |
|---|---|
| Arquitetura medallion | Databricks Associate (Data Ingestion and Loading; Data Transformation and Modeling) e Professional. Conferir no exam guide como o tema aparece na versão de maio de 2026. |
| Databricks | Databricks Associate e Professional |
| PySpark e SQL | Databricks Associate (código em SQL quando possível, senão Python) e Professional (Developing Code) |
| Python | Databricks Professional (Developing Code, Python and SQL: 23% na prova nova) |
| Modelagem dimensional | Databricks Professional (Data Modeling) e o exame de especialista Data Modelling & Design do CDMP, no nível Practitioner |
| Data warehousing em nuvem | Exame de especialista Data Warehousing & BI do CDMP, no nível Practitioner. Nenhuma prova do roadmap cobre um warehouse de nuvem específico. |
| Gestão e governança de dados | CDMP (o DMBoK inteiro), Databricks Associate (Governance and Security) e Professional (Data Governance) |

## Databricks Certified Data Engineer Associate

- 45 questões de múltipla escolha que contam nota, e pode haver outras sem nota. 90 minutos. USD 200 mais impostos.
- Online com fiscal ou em centro de testes (Kryterion/Webassessor). Sem material de consulta.
- A nota de corte não é publicada: a Databricks diz que ela é definida por análise estatística e pode mudar. O "cerca de 70%" que circula na comunidade não é oficial.
- Validade de 2 anos. A recertificação é fazer a prova vigente. Refazer exige esperar 14 dias e pagar de novo.
- Versão atual da prova: maio de 2026.
- Sem pré-requisito formal. A Databricks recomenda os cursos e 6 meses de prática em Databricks.

| Domínio | Peso |
|---|---|
| Databricks Intelligence Platform | 6% |
| Data Ingestion and Loading | 21% |
| Data Transformation and Modeling | 22% |
| Working with Lakeflow Jobs | 16% |
| Implementing CI/CD | 10% |
| Troubleshooting, Monitoring, and Optimization | 10% |
| Governance and Security | 15% |

Links: [página da prova](https://www.databricks.com/learn/certification/data-engineer-associate) · [exam guide (maio de 2026)](https://www.databricks.com/sites/default/files/2026-05/databricks-certified-data-engineer-associate-exam-guide-may-2026-000.pdf)

## Databricks Certified Data Engineer Professional

A prova muda em **09/10/2026**. A versão atual vale até 08/10/2026.

| | Prova atual (até 08/10/2026) | Prova nova (a partir de 09/10/2026) |
|---|---|---|
| Questões com nota | 59 (mais até 10 sem nota) | 60 (mais até 10 sem nota) |
| Duração | 120 min | 120 min |
| Preço | USD 200 mais impostos | USD 200 mais impostos |
| Idiomas | inglês, japonês, português (Brasil), coreano | **só inglês** |

- Online com fiscal ou em centro de testes. Nota de corte não publicada. Validade de 2 anos, com a mesma regra de recertificação da Associate.
- Sem pré-requisito formal. A Databricks recomenda 1 ano de prática.
- Temas novos na prova de outubro: Lakeflow Connect CDC, Iceberg, VARIANT, `ai_query`, ABAC, metric views, estado e watermarks em streaming.

| Domínio (prova nova) | Peso |
|---|---|
| Developing Code (Python and SQL) | 23% |
| Data Ingestion & Acquisition | 12% |
| Data Manipulation | 12% |
| Monitoring and Alerting | 10% |
| Cost & Performance Optimization | 15% |
| Security and Compliance | 8% |
| Data Governance | 5% |
| Debugging and Deploying | 10% |
| Data Modeling | 5% |

Links: [página da prova](https://www.databricks.com/learn/certification/data-engineer-professional) · [exam guide (outubro de 2026, cobre as duas versões)](https://www.databricks.com/sites/default/files/2026-09/databricks-certified-data-engineer-professional-exam-guide-oct-2026.pdf)

## CDMP: Certified Data Management Professional (DAMA International)

O nível depende da nota na prova Data Management Fundamentals, dos exames de especialista e da experiência:

| Nível | Data Management Fundamentals | Exames de especialista | Experiência |
|---|---|---|---|
| Associate | 60% ou mais | nenhum | de 6 meses a 5 anos |
| Practitioner | 70% ou mais | 2, cada um com 70% ou mais | de 2 a 10 anos |
| Master | 80% ou mais | 2, cada um com 80% ou mais | 10 anos ou mais, com análise do currículo (taxa de USD 50) |

- **Meta: 70% ou mais na Fundamentals.** A mesma nota já conta para o Practitioner, que só fica faltando os dois exames de especialista.
- Exames de especialista (escolher 2 de 7): Data Modelling & Design, Metadata, Data Quality, Data Governance, Data Warehousing & BI, Reference & Master Data Management, Data Integration & Interoperability. Data Modelling & Design e Data Warehousing & BI são os que reforçam modelagem dimensional e DW.
- Todas as provas têm 100 questões de múltipla escolha em 90 minutos. A versão ESL, para quem não tem inglês como primeira língua, dá 110 minutos. Só em inglês, online com fiscal. A compra inclui um simulado de 40 questões.
- **Com consulta:** vale um "livro", o DMBoK2 Revised Edition (a cópia digital tem de estar em outro dispositivo) ou as próprias anotações, não os dois.
- USD 311 por prova (300 mais 11 de fiscal). Refazer custa USD 200 mais a taxa de fiscal. Desde 01/08/2024, a prova tem de ser feita até 12 meses depois da compra.
- A base é o DMBoK2 Revised Edition. O DMBOK 3.0 é um projeto em andamento, iniciado em 25/06/2025 e ainda não publicado. Nenhuma página oficial anuncia mudança nas provas por causa dele.
- A validade inicial é de 3 anos. Depois a renovação é anual: taxa de manutenção (valor a confirmar), atestado de atividades em gestão de dados e adesão ao código de ética.
- Não existe exam guide separado: o material de estudo é o próprio DMBoK2.

Links: [sobre o CDMP](https://cdmp.info/about/) · [exames](https://cdmp.info/exams) · [FAQ](https://cdmp.info/faqs/) · [preços](https://dama.org/certification/exam-information-and-pricing/) · [renovação](https://dama.org/certification/cdmp-renewal-and-maintenance/) · [projeto DMBOK 3.0](https://dama.org/dama-dmbok-3-0-project/)
