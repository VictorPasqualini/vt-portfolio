import type { ProjectData } from '@/lib/types';

export const projects: ProjectData[] = [
  {
    slug: 'sparquet',
    name: 'Sparquet',
    githubUrl: 'https://github.com/VictorPasqualini/sparquet',
    homepage: 'https://sparquet.web.app/',
    language: 'TypeScript',
    topics: ['apache-spark', 'data-engineering', 'databricks', 'delta-lake', 'declarative', 'low-code', 'pyspark'],
    stars: 4,
    description: {
      en: 'Open-source data engineering framework for Apache Spark. Every pipeline is one declarative JSON contract: write it, generate it with any LLM, or design it visually in Sparquet Studio.',
      pt: 'Framework open source de engenharia de dados para Apache Spark. Cada pipeline é um único contrato JSON declarativo: escreva na mão, gere com qualquer LLM, ou desenhe visualmente no Sparquet Studio.',
    },
  },
  {
    slug: 'sparquet-cola',
    name: 'Sparquet Cola',
    githubUrl: 'https://github.com/VictorPasqualini/sparquet-cola',
    homepage: 'https://sparquet.web.app',
    language: 'Python',
    topics: ['apache-spark', 'data-quality', 'data-validation', 'data-observability', 'pyspark', 'declarative'],
    stars: 3,
    description: {
      en: 'Data quality for Spark that runs where your data already is. SODA-style metric checks, SQL rules, schema contracts — plus a valid/invalid split that tells you which rule rejected each row. Pure PySpark, no extra services.',
      pt: 'Qualidade de dados para Spark que roda onde seus dados já estão. Checks de métricas estilo SODA, regras em SQL, contratos de schema — mais uma separação válido/inválido que mostra qual regra rejeitou cada linha. PySpark puro, sem serviços extras.',
    },
  },
  {
    slug: 'pulse',
    name: 'Pulse',
    githubUrl: 'https://github.com/VictorPasqualini/pulse',
    language: 'TypeScript',
    topics: ['nextjs', 'react', 'tailwindcss', 'dashboard', 'dataviz', 'personal-finance', 'onedrive'],
    stars: 0,
    description: {
      en: "A personal finance dashboard that reads the spreadsheet you already keep on OneDrive. Income and expenses by month, spending by segment and by week, credit card, and a screen just for investments — contributions don't count as spending, yields don't count as income. No database, no new format: it maps the columns you already use.",
      pt: 'Um dashboard de finanças pessoais que lê a planilha que você já mantém no OneDrive. Receitas e despesas por mês, gastos por categoria e por semana, cartão de crédito, e uma tela só para investimentos — aportes não contam como gasto, rendimentos não contam como receita. Sem banco de dados, sem formato novo: ele mapeia as colunas que você já usa.',
    },
  },
  {
    slug: 'trader-bot',
    name: 'Trader Bot',
    githubUrl: 'https://github.com/VictorPasqualini/trader-bot',
    topics: [],
    stars: 0,
    description: {
      en: 'A personal project to place real trades on Binance and help generate some extra income.',
      pt: 'Um projeto pessoal para executar trades reais na Binance e ajudar a gerar uma renda extra.',
    },
  },
];
