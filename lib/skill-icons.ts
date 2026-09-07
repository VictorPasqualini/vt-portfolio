const BRAND_SLUGS: [string, string][] = [
  ['kubernetes', 'kubernetes'],
  ['docker', 'docker'],
  ['terraform', 'terraform'],
  ['postgresql', 'postgresql'],
  ['mysql', 'mysql'],
  ['mongodb', 'mongodb'],
  ['databricks', 'databricks'],
  ['unity catalog', 'databricks'],
  ['unitycatalog', 'databricks'],
  ['airflow', 'apacheairflow'],
  ['kafka', 'apachekafka'],
  ['spark', 'apachespark'],
  ['hadoop', 'apachehadoop'],
  ['hive', 'apachehive'],
  ['nifi', 'apachenifi'],
  ['elasticsearch', 'elasticsearch'],
  ['grafana', 'grafana'],
  ['datadog', 'datadog'],
  ['metabase', 'metabase'],
  ['bigquery', 'googlebigquery'],
  ['cloud storage', 'googlecloudstorage'],
  // Simple Icons has no product-specific GCP logos (trademark policy), but does
  // keep the generic Google Cloud mark — use it for any other GCP service.
  ['compute engine', 'googlecloud'],
  ['cloud functions', 'googlecloud'],
  ['gcp', 'googlecloud'],
  ['rabbitmq', 'rabbitmq'],
  ['gitlab', 'gitlab'],
  ['bitbucket', 'bitbucket'],
  ['git', 'git'],
  ['linux', 'linux'],
  ['python', 'python'],
  ['scala', 'scala'],
  ['java', 'openjdk'],
  ['duckdb', 'duckdb'],
  ['pandas', 'pandas'],
  ['numpy', 'numpy'],
  ['django', 'django'],
];

export type InlineIconName =
  | 'aws'
  | 'database'
  | 'code'
  | 'sync'
  | 'layers'
  | 'schedule'
  | 'pipeline'
  | 'chart'
  | 'infra'
  | 'tag';

// Skills with no usable brand asset anywhere (AWS pulled all its logos from
// Simple Icons; the rest are concepts, legacy tech or vendor tools that never
// had one) get a hand-drawn icon that at least says what kind of thing it is.
const INLINE_KEYWORDS: [string, InlineIconName][] = [
  ['aws', 'aws'],
  ['glue', 'aws'],
  ['emr', 'aws'],
  ['ec2', 'aws'],
  ['lambda', 'aws'],
  ['sqoop', 'aws'],
  ['sqs', 'aws'],
  ['msk', 'aws'],
  ['mwaa', 'aws'],
  ['eventbridge', 'aws'],
  ['event bridge', 'aws'],
  ['step functions', 'aws'],
  ['s3', 'aws'],
  ['rds', 'aws'],
  ['dynamodb', 'aws'],
  ['documentdb', 'aws'],
  ['cloudformation', 'aws'],
  ['cloudwatch', 'aws'],
  ['athena', 'aws'],
  ['sql', 'database'],
  ['oracle', 'database'],
  ['db2', 'database'],
  ['kudu', 'database'],
  ['impala', 'database'],
  ['cobol', 'code'],
  ['cdc', 'sync'],
  ['iceberg', 'layers'],
  ['delta lake', 'layers'],
  ['deltalake', 'layers'],
  ['medallion', 'layers'],
  ['medalhão', 'layers'],
  ['composer', 'schedule'],
  ['ctrl-m', 'schedule'],
  ['ctrlm', 'schedule'],
  ['power bi', 'chart'],
  ['powerbi', 'chart'],
  ['terragrunt', 'infra'],
];

function primaryOf(label: string): string {
  return label.split(/[/(]/)[0]?.trim().toLowerCase() ?? '';
}

export type SkillIcon = { kind: 'brand'; slug: string } | { kind: 'inline'; name: InlineIconName };

/** Matches against the part of the skill label before the first "(" or "/" so
 * parenthetical extras (e.g. "Python (PySpark, Pandas...)") don't steal the icon. */
export function getSkillIcon(label: string): SkillIcon {
  // "CI/CD (Cockpit)" would otherwise be truncated to "ci" by primaryOf.
  if (label.toLowerCase().includes('ci/cd')) return { kind: 'inline', name: 'pipeline' };

  const primary = primaryOf(label);
  const brand = BRAND_SLUGS.find(([keyword]) => primary.includes(keyword));
  if (brand) return { kind: 'brand', slug: brand[1] };

  const inline = INLINE_KEYWORDS.find(([keyword]) => primary.includes(keyword));
  return { kind: 'inline', name: inline ? inline[1] : 'tag' };
}
