import type { CaseSample, CaseStudy } from '@/lib/types';

/**
 * Long-form write-ups, one per slug in content/projects.ts. The order here is
 * the order the "next project" link walks, so it should match the card order.
 *
 * The prose is deliberately short: each section states its point in a paragraph
 * and then shows it, because a project is easier to judge from its own API,
 * config or output than from a description of them. Every sample comes from the
 * repository it describes — README, tests or source — so all of this has to be
 * revisited when a project moves, not only when the wording feels stale.
 */

// --------------------------------------------------------------- sparquet

const SPARQUET_PIPELINE_CODE = `{
  "name": "customers_curated",
  "input": { "format": "csv", "path": "/data/landing/customers" },
  "transformations": [
    { "type": "filter", "condition": "status = 'active'" },
    { "type": "cast", "columns": { "created_at": "timestamp" } },
    { "type": "drop_duplicates", "columns": ["id"] }
  ],
  "validations": {
    "on_failure": "warn",
    "rules": [
      { "type": "not_null", "columns": ["id"] },
      { "type": "unique", "columns": ["id"] }
    ],
    "report": { "format": "csv", "path": "/dq/customers", "mode": "append" }
  },
  "output": {
    "format": "parquet",
    "path": "/data/curated/customers",
    "mode": "overwrite",
    "partition_by": ["created_at"]
  }
}`;

const SPARQUET_PUSHDOWN_CODE = `{ "type": "checkpoint" },
{ "type": "collect", "column": "id_cliente", "as": "clientes_ativos" },
{ "type": "join",
  "input": { "format": "delta", "path": "vendas.bronze_eventos_cliente" },
  "with_transformations": [
    { "type": "filter", "condition": "id_cliente IN ({{clientes_ativos}})" },
    { "type": "distinct" }
  ],
  "on": "id_cliente", "how": "left" }`;

const SPARQUET_RUN_CODE = `from sparquet import Sparquet

fw = Sparquet(spark={"app_name": "MyJob", "master": "local[*]"})
result = fw.run("pipeline.json", params={"dt_ref": "2026-01-01"})
print(result.summary())
fw.stop()

# or, without writing any Python at all:
# $ sparquet pipeline.json`;

// ----------------------------------------------------------- sparquet-cola

const COLA_RUN_CODE = `from sparquet_cola import Cola

cola = Cola()

for r in cola.run(df, [
    {"type": "row_count", "min": 1},
    {"type": "not_null", "columns": ["id", "email"]},
    {"type": "missing_percent", "column": "cpf", "must_be": "< 5%", "warn": "= 0"},
    {"type": "sql", "failed_rows": "SELECT * FROM _validation_df WHERE amount < 0"},
]):
    print(r)   # [FAIL] check: missing_percent(cpf) = 8 violates must_be (< 5%)`;

const COLA_SPLIT_CODE = `split = cola.split(df, [
    {"type": "not_null", "columns": ["id", "email"]},
    {"type": "range", "column": "age", "min": 1, "max": 99, "code": "AGE_RANGE"},
], annotate="dq_codes")

split.valid.write.format("delta").save(".../silver_ok")
split.invalid.write.format("delta").save(".../silver_quarantine")

split.invalid.select("id", "dq_codes").show(truncate=False)
# +----+-------------------+
# | id | dq_codes          |
# +----+-------------------+
# | 7  | [AGE_RANGE]       |
# | 8  | [not_null(email)] |
# +----+-------------------+`;

const COLA_TARGETS_CODE = `{"type": "regex", "targets": [
    {"column": "document",  "pattern": "^[0-9]{11}$"},
    {"column": "document2", "pattern": "^[0-9]{12}$"}]}

# regex(document,^[0-9]{11}$)
# regex(document2,^[0-9]{12}$)`;

const COLA_BATCH_CODE = `class NoFutureDateCheck(BaseCheck):
    def aggregations(self, df):
        return [F.count(F.when(F.col(self.params["column"]) > F.current_date(), F.lit(1)))]

    def from_aggregations(self, values):
        failed = int(values[0])
        if failed:
            return CheckResult("no_future_date", False, f"{failed} future dates", failed)
        return CheckResult("no_future_date", True)`;

// ------------------------------------------------------------------ pulse

const PULSE_BUCKET_CODE = `export type Bucket =
  | "income"           // feeds the cash flow, as money in
  | "expense"          // feeds the cash flow, as money out
  | "invest_contrib"   // a contribution is not spending
  | "invest_withdraw"  // a withdrawal is not income
  | "invest_yield";    // a yield is not income either`;

const PULSE_SHEET_CODE = `date         description        amount        segment      asset
04/09/2026   Mercado            R$ 312,45     Mercado
05/09/2026   Aporte Tesouro     (R$ 500,00)   Investimento Tesouro Selic
10/09/2026   Salário            R$ 8.400,00   Renda

# dd/mm/yyyy, "R$ 1.234,56" and parentheses-as-negative are read as they are.
# The filled "asset" column is the strongest signal that a row is an investment.`;

// -------------------------------------------------------------- trader bot

const POUCH_FLOW_CODE = `market history (Binance public API, up to 5000 candles)
        |
        v
  research sweep  ->  optimise parameters on the first 65% of history
        |               score on the held-out 35% (out-of-sample)
        v
   leaderboard    ->  only candidates that stay profitable out-of-sample,
        |               beat buy-and-hold, and earn money across sub-periods
        |               are marked "aprovada"
        v
  walk-forward    ->  the same parameters re-run over eight rolling quarters,
        |               judged on how many they won, not on the total
        v
   live engine    ->  runs the chosen strategies on the testnet,
                      one position per symbol, acting on closed candles only`;

const POUCH_COST_CODE = `# every simulated trade is charged on both sides
FEE      = 0.001    # 0.1%, the same rate paper trading charges
SLIPPAGE = 0.0005   # 0.05% assumption

# and the backtester refuses to flatter itself:
#   the position decided at bar t's close is filled at bar t+1's open
#   when a bar touches both the stop and the target, the stop hits first
#   after a protective exit the strategy stands aside until its signal
#   drops and turns long again`;

const asSample = (caption: string, code: string): CaseSample => ({ caption, code });

/**
 * Screenshots of each project running, captured from its own repository and
 * stored under public/cases. Only the geometry lives here; the caption belongs
 * to the locale that uses it, and doubles as the alt text.
 */
const SHOT_SPARQUET_TEMPLATES = { src: '/cases/sparquet-templates.webp', width: 1512, height: 900 };
const SHOT_SPARQUET_EDITOR = { src: '/cases/sparquet-editor.webp', width: 1512, height: 900 };
const SHOT_PULSE_PANEL = { src: '/cases/pulse-painel.webp', width: 1600, height: 1000 };
const SHOT_PULSE_INVEST = { src: '/cases/pulse-investimentos.webp', width: 1600, height: 1000 };
const SHOT_PULSE_CARDS = { src: '/cases/pulse-cartoes.webp', width: 1600, height: 1000 };
const SHOT_TRADER_PANEL = { src: '/cases/trader-painel.webp', width: 1600, height: 1111 };
const SHOT_TRADER_VALIDATION = { src: '/cases/trader-validacao.webp', width: 1600, height: 1111 };

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sparquet',
    en: {
      tagline: 'A Spark pipeline as a JSON document: written, generated, or drawn on a canvas.',
      facts: [
        { label: 'Role', value: 'Author and maintainer' },
        { label: 'Period', value: '2026 — now' },
        { label: 'Stack', value: 'Python · PySpark · Delta Lake' },
        { label: 'Install', value: 'pip install sparquet' },
      ],
      highlights: [
        { value: '19', label: 'transformations' },
        { value: '27', label: 'formats and connectors' },
        { value: '1', label: 'document the canvas and the engine share' },
        { value: '3', label: 'doc languages: EN · PT · ES' },
      ],
      sections: [
        {
          title: 'The problem',
          body: [
            'Batch pipelines keep the same shape (read, transform, validate, write) and each one is rewritten as code anyway. Answering "what does this job actually do?" then means reading a PySpark diff, and the answer cannot be diffed, linted, generated or drawn.',
          ],
        },
        {
          title: 'The pipeline is the document',
          body: [
            'A pipeline is one JSON contract, executed by the framework and parsed by nothing else. It runs as-is from Python or from the CLI, and the same file opens on the Studio canvas as connected nodes.',
          ],
          sample: asSample('A whole pipeline: input, transformations, validations, output', SPARQUET_PIPELINE_CODE),
          shot: { ...SHOT_SPARQUET_TEMPLATES, caption: 'Sparquet Studio: every template is a pipeline that runs, and compiles to that same JSON' },
        },
        {
          title: 'Declarative where it usually gets imperative',
          body: [
            'The parts people drop back into code for have a declarative form: `{param}` template parameters resolved before parsing, `{{var}}` runtime variables that push a collected key set into a later read as a literal `IN (...)` (the declarative version of the `collect()` + `isin()` trick that makes Delta data skipping work), reusable `$include` fragments, and several destinations from a single pass.',
          ],
          sample: asSample('Runtime pushdown: collect keys, then skip data on the next read', SPARQUET_PUSHDOWN_CODE),
        },
        {
          title: 'Two halves, one contract',
          body: [
            'Studio is a browser canvas that reads and writes exactly those documents: it lints as you type, generates a pipeline with an LLM of your choice, and executes through a local runner bound to 127.0.0.1: no account, no server, no telemetry. It never invents syntax the framework does not support, and the framework never needs it to run.',
            'Data quality is the same story: it is `sparquet-cola`, a standalone library, declared as a dependency and re-exported under `sparquet.validation.*`.',
          ],
          sample: asSample('Run it from Python, or from the command line', SPARQUET_RUN_CODE),
          shot: { ...SHOT_SPARQUET_EDITOR, caption: 'The canvas edits the contract; the inspector explains the node it has selected' },
        },
        {
          title: 'Where it runs',
          body: [],
          bullets: [
            'Locally, on Databricks, EMR, Dataproc or Synapse: the session manager detects the environment',
            'Python 3.9 through 3.14, on PySpark 3.4+',
            'Extensible: register your own readers, writers, transformations and validators',
            'Documented at sparquet.dev in English, Portuguese and Spanish',
          ],
        },
      ],
    },
    pt: {
      tagline: 'Um pipeline Spark como documento JSON: escrito, gerado, ou desenhado num canvas.',
      facts: [
        { label: 'Papel', value: 'Autor e mantenedor' },
        { label: 'Período', value: '2026 — hoje' },
        { label: 'Stack', value: 'Python · PySpark · Delta Lake' },
        { label: 'Instalação', value: 'pip install sparquet' },
      ],
      highlights: [
        { value: '19', label: 'transformações' },
        { value: '27', label: 'formatos e conectores' },
        { value: '1', label: 'documento compartilhado por canvas e engine' },
        { value: '3', label: 'idiomas na doc: EN · PT · ES' },
      ],
      sections: [
        {
          title: 'O problema',
          body: [
            'Pipeline batch tem sempre a mesma forma (ler, transformar, validar, escrever) e mesmo assim cada um é reescrito em código. Responder "o que esse job faz?" vira ler um diff de PySpark, e essa resposta não dá para versionar como contrato, lintar, gerar nem desenhar.',
          ],
        },
        {
          title: 'O pipeline é o documento',
          body: [
            'Um pipeline é um contrato JSON, executado pelo framework e interpretado por mais ninguém. Roda como está pelo Python ou pela CLI, e o mesmo arquivo abre no canvas do Studio como nós conectados.',
          ],
          sample: asSample('Um pipeline inteiro: input, transformações, validações, output', SPARQUET_PIPELINE_CODE),
          shot: { ...SHOT_SPARQUET_TEMPLATES, caption: 'Sparquet Studio: cada template é um pipeline que roda, e compila para esse mesmo JSON' },
        },
        {
          title: 'Declarativo onde costuma virar imperativo',
          body: [
            'As partes em que todo mundo volta para o código têm forma declarativa: parâmetros `{param}` resolvidos antes do parse, variáveis de runtime `{{var}}` que empurram um conjunto de chaves coletado para a leitura seguinte como um `IN (...)` literal (a versão declarativa do truque `collect()` + `isin()` que faz o data skipping do Delta funcionar), fragmentos reutilizáveis via `$include`, e vários destinos numa passada só.',
          ],
          sample: asSample('Pushdown de runtime: coleta as chaves e pula dados na leitura seguinte', SPARQUET_PUSHDOWN_CODE),
        },
        {
          title: 'Duas metades, um contrato',
          body: [
            'O Studio é um canvas no navegador que lê e escreve exatamente esses documentos: linta enquanto você digita, gera um pipeline com o LLM que você escolher, e executa por um runner local preso em 127.0.0.1: sem conta, sem servidor, sem telemetria. Ele nunca inventa sintaxe que o framework não suporta, e o framework nunca precisa dele para rodar.',
            'Qualidade de dados segue a mesma ideia: é o `sparquet-cola`, biblioteca separada, declarada como dependência e reexportada em `sparquet.validation.*`.',
          ],
          sample: asSample('Roda pelo Python, ou pela linha de comando', SPARQUET_RUN_CODE),
          shot: { ...SHOT_SPARQUET_EDITOR, caption: 'O canvas edita o contrato; o inspector explica o node selecionado' },
        },
        {
          title: 'Onde roda',
          body: [],
          bullets: [
            'Local, Databricks, EMR, Dataproc ou Synapse: o session manager detecta o ambiente',
            'Python 3.9 a 3.14, sobre PySpark 3.4+',
            'Extensível: registre seus próprios readers, writers, transformações e validadores',
            'Documentado no sparquet.dev em inglês, português e espanhol',
          ],
        },
      ],
    },
  },
  {
    slug: 'sparquet-cola',
    en: {
      tagline: 'Data quality for Spark as a library, not another service to run.',
      facts: [
        { label: 'Role', value: 'Author and maintainer' },
        { label: 'Period', value: '2026 — now' },
        { label: 'Stack', value: 'Python · PySpark · SQL' },
        { label: 'Install', value: 'pip install sparquet-cola' },
      ],
      highlights: [
        { value: '21', label: 'rule types out of the box' },
        { value: '1', label: 'Spark action for a whole block' },
        { value: '1', label: 'dependency: pyspark' },
        { value: '3', label: 'doc languages: EN · PT · ES' },
      ],
      sections: [
        {
          title: 'The problem',
          body: [
            'Data quality tooling usually arrives as a platform: a service to deploy next to the cluster that is already holding the data. And its output stops at a verdict: "3,412 rows failed" says the table is bad, not which rule rejected which row, so the quarantine it writes cannot actually be worked.',
          ],
        },
        {
          title: 'Rules are data',
          body: [
            'One class, `Cola`, with a registry of rule types. A rule is a plain dict (a `type` plus that check’s parameters), so a validation block can be written by hand, generated, or stored next to the pipeline that runs it. Thresholds are one small DSL shared by every metric: `> 0`, `< 5%`, `between 10 and 20`, `<= 2h`.',
          ],
          sample: asSample('A rule is a dict. A failed check is a result, never an exception.', COLA_RUN_CODE),
        },
        {
          title: 'Codes, so the quarantine is workable',
          body: [
            'Every row-level rule carries a code: declared, or rendered from the rule itself, always the same string for the same rule, because that string lands in your data. `annotate` writes it beside each rejected row, built from predicates the split already computes, so it costs no extra pass.',
          ],
          sample: asSample('The quarantine table says which rule rejected each row', COLA_SPLIT_CODE),
        },
        {
          title: 'One rule, several targets',
          body: [
            'Each target expands into an independent rule with its own result, its own code and its own share of the quarantine: a single verdict over two columns would not say which of them broke. Ambiguous forms (an empty target list, a nested `targets`, a `code` on the parent) are refused at parse time instead of being silently degraded.',
          ],
          sample: asSample('One rule, two targets: two independent results and two codes', COLA_TARGETS_CODE),
        },
        {
          title: 'One Spark action instead of a dozen',
          body: [
            'Until v0.4.0 each check fired its own action, often more than one, so a block of a dozen rules scanned the data a dozen times. Now `run` collects the columns of every check that answered, issues a single `df.agg(...)`, and hands each check back its slice. Checks registered from outside, which cannot know the mechanism exists, keep their own action and keep working unchanged.',
            '`tests/test_run_batch_spark.py` runs each rule alone and again inside a block, comparing verdict, message, `failed_count`, `severity` and `metric_value` field by field, so the two paths cannot drift.',
          ],
          sample: asSample('A check declares what it wants measured; run() issues one df.agg(...)', COLA_BATCH_CODE),
        },
        {
          title: 'Where it runs',
          body: [],
          bullets: [
            'PyPI: `pip install sparquet-cola`, imported as `sparquet_cola`',
            'Drops into a Spark job, a notebook or an Airflow task',
            'Documented in English, Portuguese and Spanish',
            'The engine behind the `validations` block of Sparquet',
          ],
        },
      ],
    },
    pt: {
      tagline: 'Qualidade de dados para Spark como biblioteca, não mais um serviço para operar.',
      facts: [
        { label: 'Papel', value: 'Autor e mantenedor' },
        { label: 'Período', value: '2026 — hoje' },
        { label: 'Stack', value: 'Python · PySpark · SQL' },
        { label: 'Instalação', value: 'pip install sparquet-cola' },
      ],
      highlights: [
        { value: '21', label: 'tipos de regra prontos' },
        { value: '1', label: 'action do Spark por bloco' },
        { value: '1', label: 'dependência: pyspark' },
        { value: '3', label: 'idiomas na doc: EN · PT · ES' },
      ],
      sections: [
        {
          title: 'O problema',
          body: [
            'Ferramenta de qualidade de dados costuma chegar como plataforma: um serviço para subir ao lado do cluster que já está com os dados na mão. E a saída costuma parar no veredito: "3.412 linhas falharam" diz que a tabela está ruim, não qual regra rejeitou qual linha, então a quarentena que ela escreve não dá para trabalhar.',
          ],
        },
        {
          title: 'Regras são dados',
          body: [
            'Uma classe, `Cola`, com um registry de tipos de regra. Uma regra é um dict simples (a chave `type` mais os parâmetros daquele check), então o bloco de validação pode ser escrito à mão, gerado, ou guardado junto do pipeline que o executa. Thresholds são uma DSL pequena compartilhada por toda métrica: `> 0`, `< 5%`, `between 10 and 20`, `<= 2h`.',
          ],
          sample: asSample('Regra é dict. Check que falha é resultado, nunca exceção.', COLA_RUN_CODE),
        },
        {
          title: 'Códigos, para a quarentena ser acionável',
          body: [
            'Toda regra row-level carrega um código: declarado, ou renderizado a partir da própria regra, sempre a mesma string para a mesma regra, porque essa string vai parar nos seus dados. O `annotate` escreve esse código ao lado de cada linha rejeitada, a partir dos predicados que o split já calcula, então não custa passada extra.',
          ],
          sample: asSample('A tabela de quarentena diz qual regra rejeitou cada linha', COLA_SPLIT_CODE),
        },
        {
          title: 'Uma regra, vários targets',
          body: [
            'Cada target vira uma regra independente, com resultado próprio, código próprio e contribuição própria para a quarentena: um veredito único sobre duas colunas não diria qual delas quebrou. Formas ambíguas (lista de targets vazia, `targets` aninhado, `code` no pai) são recusadas em tempo de parse em vez de degradadas em silêncio.',
          ],
          sample: asSample('Uma regra, dois targets: dois resultados e dois códigos independentes', COLA_TARGETS_CODE),
        },
        {
          title: 'Uma action do Spark no lugar de uma dúzia',
          body: [
            'Até a v0.4.0 cada check disparava sua própria action, em geral mais de uma, então um bloco de uma dúzia de regras varria os dados uma dúzia de vezes. Agora o `run` junta as colunas de todo check que respondeu, emite um único `df.agg(...)` e devolve a cada check a sua fatia. Checks registrados de fora, que não têm como saber que o mecanismo existe, seguem com a própria action e seguem funcionando sem mudança.',
            'O `tests/test_run_batch_spark.py` roda cada regra sozinha e de novo dentro de um bloco, comparando veredito, mensagem, `failed_count`, `severity` e `metric_value` campo a campo, para os dois caminhos não poderem divergir.',
          ],
          sample: asSample('O check declara o que quer medido; o run() emite um df.agg(...)', COLA_BATCH_CODE),
        },
        {
          title: 'Onde roda',
          body: [],
          bullets: [
            'PyPI: `pip install sparquet-cola`, importado como `sparquet_cola`',
            'Entra em um job Spark, um notebook ou uma task do Airflow',
            'Documentado em inglês, português e espanhol',
            'É o motor por trás do bloco `validations` do Sparquet',
          ],
        },
      ],
    },
  },
  {
    slug: 'pulse',
    en: {
      tagline: 'A finance dashboard that reads the spreadsheet you already keep, and knows a contribution is not spending.',
      facts: [
        { label: 'Role', value: 'Author' },
        { label: 'Period', value: '2025 — now' },
        { label: 'Stack', value: 'Next.js · React · TypeScript' },
        { label: 'Source', value: 'A OneDrive share link' },
      ],
      highlights: [
        { value: '0', label: 'databases: the sheet is the truth' },
        { value: '5', label: 'buckets every row falls into' },
        { value: '4', label: 'runtime dependencies' },
        { value: '0', label: 'charting libraries: the SVG is hand-written' },
      ],
      sections: [
        {
          title: 'The rule that defines the product',
          body: [
            'On a spreadsheet a contribution looks like money out and a yield looks like money in. That is correct bookkeeping and ruinous reporting: adding those rows to the cash flow inflates income and expense at once, and destroys any sense of what you actually spend and save. So every row falls into one of five buckets, and only two of them feed the cash flow.',
          ],
          sample: asSample('src/lib/types.ts: the whole product in one union', PULSE_BUCKET_CODE),
          shot: { ...SHOT_PULSE_INVEST, caption: 'The investments screen, where contributions and yields are the subject (demo data)' },
        },
        {
          title: 'It reads your sheet, not a new format',
          body: [
            'Paste a OneDrive share link and the reader converts it into a download URL, guesses the header row and the columns by keyword, and shows you the first rows to confirm. `.xlsx`, `.csv` and `.tsv` all work; the `.xlsx` reader is written in-house on top of `fflate`, so the only real dependency is a zip decoder.',
          ],
          sample: asSample('Brazilian formats are read as they are, with no configuration', PULSE_SHEET_CODE),
        },
        {
          title: 'No database, on purpose',
          body: [
            'Nothing is imported and nothing is stored: add a line in the sheet, click refresh, the dashboard moves. The fetch is cached for 60 seconds and guarded against SSRF, and the only persisted state is a local config file: the link, the tab, the column mapping and the classification rules. Delete it and the app is new again.',
          ],
          shot: { ...SHOT_PULSE_PANEL, caption: 'The month panel reading a spreadsheet straight from disk; the header names the file' },
        },
        {
          title: 'Five screens, and charts that cannot go off-palette',
          body: [
            'A month panel, an investments screen where contributions and yields are the subject rather than noise, a credit-card screen, the full filterable ledger (including the rows the reader could not interpret) and the configuration. The charts are hand-written SVG and never read a hex value: every colour comes from a custom property, so light and dark themes cannot drift apart and no component can escape the palette.',
          ],
          shot: { ...SHOT_PULSE_CARDS, caption: 'The credit-card screen: hand-written SVG, and every colour from the palette' },
        },
      ],
    },
    pt: {
      tagline: 'Um painel financeiro que lê a planilha que você já mantém, e sabe que aporte não é gasto.',
      facts: [
        { label: 'Papel', value: 'Autor' },
        { label: 'Período', value: '2025 — hoje' },
        { label: 'Stack', value: 'Next.js · React · TypeScript' },
        { label: 'Fonte', value: 'Um link de compartilhamento do OneDrive' },
      ],
      highlights: [
        { value: '0', label: 'bancos de dados: a planilha é a verdade' },
        { value: '5', label: 'baldes em que toda linha cai' },
        { value: '4', label: 'dependências em runtime' },
        { value: '0', label: 'bibliotecas de gráfico: o SVG é escrito à mão' },
      ],
      sections: [
        {
          title: 'A regra que define o produto',
          body: [
            'Na planilha, aporte parece saída e rendimento parece entrada. Contabilmente está certo e como relatório é desastroso: somar essas linhas ao fluxo de caixa infla receita e despesa ao mesmo tempo e destrói qualquer noção de quanto você gasta e poupa. Por isso toda linha cai em um de cinco baldes, e só dois alimentam o fluxo de caixa.',
          ],
          sample: asSample('src/lib/types.ts: o produto inteiro em uma union', PULSE_BUCKET_CODE),
          shot: { ...SHOT_PULSE_INVEST, caption: 'A tela de investimentos, onde aporte e rendimento são o assunto (dados de demonstração)' },
        },
        {
          title: 'Lê a sua planilha, não um formato novo',
          body: [
            'Cole o link de compartilhamento do OneDrive: o leitor converte em URL de download, adivinha a linha de cabeçalho e as colunas por palavra-chave, e mostra as primeiras linhas para você conferir. `.xlsx`, `.csv` e `.tsv` funcionam igual; o leitor de `.xlsx` é próprio, escrito sobre o `fflate`, então a única dependência de verdade é um descompactador de zip.',
          ],
          sample: asSample('Formatos brasileiros lidos como estão, sem configuração', PULSE_SHEET_CODE),
        },
        {
          title: 'Sem banco de dados, de propósito',
          body: [
            'Nada é importado e nada é armazenado: adicione uma linha na planilha, clique em atualizar, o painel muda. A busca tem cache de 60 segundos e guarda contra SSRF, e o único estado persistido é um arquivo de configuração local: link, aba, mapeamento de colunas e regras de classificação. Apague e o app volta ao estado inicial.',
          ],
          shot: { ...SHOT_PULSE_PANEL, caption: 'O painel do mês lendo a planilha direto; o cabeçalho diz qual arquivo foi lido' },
        },
        {
          title: 'Cinco telas, e gráficos que não escapam da paleta',
          body: [
            'Painel do mês, tela de investimentos onde aporte e rendimento são o assunto e não ruído, tela de cartões, o extrato completo e filtrável (inclusive as linhas que o leitor não conseguiu interpretar) e a configuração. Os gráficos são SVG escrito à mão e nunca leem hexadecimal: toda cor vem de uma custom property, então tema claro e escuro não divergem e nenhum componente consegue fugir da paleta.',
          ],
          shot: { ...SHOT_PULSE_CARDS, caption: 'A tela de cartões: SVG escrito à mão, e toda cor vinda da paleta' },
        },
      ],
    },
  },
  {
    slug: 'pouch',
    en: {
      tagline: 'Almost nothing works; the hard part is telling which. Research first, testnet money only.',
      facts: [
        { label: 'Role', value: 'Author' },
        { label: 'Period', value: '2025 — now' },
        { label: 'Stack', value: 'Python · LightGBM · FastAPI' },
        { label: 'Trades on', value: 'Binance Spot Testnet (fake money)' },
      ],
      highlights: [
        { value: '13', label: 'strategies swept across hundreds of parameter sets' },
        { value: '35%', label: 'of history held out from the optimiser' },
        { value: '8', label: 'rolling quarters of walk-forward' },
        { value: '3', label: 'separate books, separate ledgers' },
      ],
      sections: [
        {
          title: 'The premise',
          body: [
            'Most trading bots ship a strategy and assume it works. This one assumes the opposite and spends its effort on the difference: which strategies survive data they were never fitted to. Research reads real candle history from Binance’s public API; orders and balances come from the Spot Testnet, with fake money. The two are deliberately separate, because the testnet’s own history is shallow and partly synthetic.',
          ],
          sample: asSample('From market history to a live allocation', POUCH_FLOW_CODE),
        },
        {
          title: 'A candidate has to earn the word "approved"',
          body: [
            'Parameters are fitted on the older 65% of history and ranked only on the 35% the optimiser never touched. On that held-out slice a candidate must:',
          ],
          bullets: [
            'be profitable',
            'hold a Sharpe above 0.3',
            'contain at least 3 trades',
            'beat buy-and-hold over the same window',
            'turn a profit in at least half of eight equal sub-periods',
          ],
          shot: { ...SHOT_TRADER_VALIDATION, caption: 'The readiness checklist: the bot answers “not yet” until every line is green' },
        },
        {
          title: 'A backtester that refuses to flatter itself',
          body: [
            'Every assumption is set against the strategy. A signal is filled on the next bar’s open, so it can never see the price it trades at; when a bar touches both the stop and the target, the stop is assumed to hit first; the live engine acts only on closed candles and enters only on a signal transition, so a new allocation never buys a move that started days ago. Fees are read back from the exchange rather than assumed, which matters precisely because the testnet charges none: the 0.2% per round trip would otherwise show up for the first time on real money.',
          ],
          sample: asSample('Costs charged on both sides, and the rules of engagement', POUCH_COST_CODE),
        },
        {
          title: 'Walk-forward, then three books',
          body: [
            'One train/test split tests one regime change, so the survivors are re-run over eight rolling quarters and judged on how many they won rather than on the total. Measured on this project’s live allocations, carrying the deployed parameters beat re-optimising each window on five of six; 365 daily bars cannot support a 500-point grid.',
            'The dashboard runs three books side by side and keeps their ledgers apart: the validated rule-based one, a machine-learning experiment that ranks the universe daily, and an exit experiment that enters identically and exits four different ways, settling by measurement a question usually settled by opinion.',
          ],
          shot: { ...SHOT_TRADER_PANEL, caption: 'The validated book and the ML lab side by side, on a testnet account' },
        },
        {
          title: 'How it reports',
          body: [],
          bullets: [
            'A local dashboard on 127.0.0.1, no build step',
            'Equity, realised and unrealised P&L, win rate, profit factor, drawdown, Sharpe',
            'Every entry and exit with the indicator values that triggered it',
            'Seventeen allocations on 4h and 1d candles, mostly doing nothing, legibly',
          ],
        },
      ],
    },
    pt: {
      tagline: 'Quase nada funciona; o difícil é saber o quê. Pesquisa primeiro, e só dinheiro de testnet.',
      facts: [
        { label: 'Papel', value: 'Autor' },
        { label: 'Período', value: '2025 — hoje' },
        { label: 'Stack', value: 'Python · LightGBM · FastAPI' },
        { label: 'Opera na', value: 'Binance Spot Testnet (dinheiro fictício)' },
      ],
      highlights: [
        { value: '13', label: 'estratégias varridas em centenas de parâmetros' },
        { value: '35%', label: 'da história escondida do otimizador' },
        { value: '8', label: 'trimestres móveis de walk-forward' },
        { value: '3', label: 'livros separados, ledgers separados' },
      ],
      sections: [
        {
          title: 'A premissa',
          body: [
            'A maioria dos bots entrega uma estratégia e assume que funciona. Este assume o contrário e gasta o esforço justamente na diferença: quais estratégias sobrevivem a dados em que nunca foram ajustadas. A pesquisa lê histórico real de candles da API pública da Binance; ordens e saldos vêm da Spot Testnet, com dinheiro fictício. Os dois são separados de propósito, porque o histórico da própria testnet é raso e em parte sintético.',
          ],
          sample: asSample('Do histórico de mercado até uma alocação ao vivo', POUCH_FLOW_CODE),
        },
        {
          title: 'Uma candidata precisa merecer o "aprovada"',
          body: [
            'Os parâmetros são ajustados nos 65% mais antigos da história e a classificação sai só dos 35% que o otimizador nunca viu. Nessa fatia escondida, a candidata precisa:',
          ],
          bullets: [
            'ser lucrativa',
            'ter Sharpe acima de 0,3',
            'ter pelo menos 3 trades',
            'bater buy-and-hold na mesma janela',
            'dar lucro em pelo menos metade de oito subperíodos iguais',
          ],
          shot: { ...SHOT_TRADER_VALIDATION, caption: 'O checklist de prontidão: o robô responde “ainda não” enquanto houver linha vermelha' },
        },
        {
          title: 'Um backtester que se recusa a se elogiar',
          body: [
            'Toda premissa é contra a estratégia. O sinal é executado na abertura do candle seguinte, então nunca vê o preço em que opera; quando um candle toca stop e alvo, assume-se que o stop veio primeiro; o motor ao vivo só age em candle fechado e só entra na transição do sinal, então uma alocação nova nunca compra um movimento que começou dias atrás. As taxas são lidas de volta da corretora em vez de assumidas, e isso importa justamente porque a testnet não cobra nenhuma: os 0,2% por round trip apareceriam pela primeira vez com dinheiro de verdade.',
          ],
          sample: asSample('Custo dos dois lados, e as regras de engajamento', POUCH_COST_CODE),
        },
        {
          title: 'Walk-forward, e depois três livros',
          body: [
            'Uma divisão treino/teste testa uma única virada de regime, então as sobreviventes são reexecutadas em oito trimestres móveis e julgadas por quantos venceram, não pelo total. Medido nas alocações ao vivo deste projeto, manter os parâmetros em produção ganhou de reotimizar a cada janela em cinco de seis; 365 candles diários não sustentam uma grade de 500 pontos.',
            'O painel roda três livros lado a lado com ledgers separados: o validado, baseado em regras; um experimento de machine learning que ranqueia o universo todo dia; e um experimento de saída que entra igual e sai de quatro formas diferentes, resolvendo por medição uma discussão que costuma ser resolvida por opinião.',
          ],
          shot: { ...SHOT_TRADER_PANEL, caption: 'O livro validado e o laboratório de ML lado a lado, numa conta de testnet' },
        },
        {
          title: 'Como ele reporta',
          body: [],
          bullets: [
            'Painel local em 127.0.0.1, sem build step',
            'Patrimônio, P&L realizado e não realizado, win rate, profit factor, drawdown, Sharpe',
            'Cada entrada e saída com os valores dos indicadores que dispararam',
            'Dezessete alocações em candles de 4h e 1d, quase sempre paradas, de forma legível',
          ],
        },
      ],
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
