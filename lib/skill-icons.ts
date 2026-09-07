const BRAND_SLUGS: [string, string][] = [
  ['kubernetes', 'kubernetes'],
  ['docker', 'docker'],
  ['terraform', 'terraform'],
  ['postgresql', 'postgresql'],
  ['mysql', 'mysql'],
  ['mongodb', 'mongodb'],
  ['databricks', 'databricks'],
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

// Managed cloud services with no Simple Icons brand asset (AWS/GCP trademark
// policy excludes most product-specific logos) — flagged so they still get a
// meaningful icon instead of falling back to the plain generic tag.
const CLOUD_SERVICE_KEYWORDS = [
  'glue',
  'emr',
  'ec2',
  'lambda',
  'sqoop',
  'compute engine',
  'cloud functions',
  'sqs',
  'msk',
  'mwaa',
  'eventbridge',
  'event bridge',
  'step functions',
  's3',
  'rds',
  'dynamodb',
  'documentdb',
  'cloudformation',
  'cloudwatch',
  'athena',
  'kudu',
  'impala',
];

function primaryOf(label: string): string {
  return label.split(/[/(]/)[0]?.trim().toLowerCase() ?? '';
}

export type SkillIcon = { kind: 'brand'; slug: string } | { kind: 'cloud' } | { kind: 'generic' };

/** Matches against the part of the skill label before the first "(" or "/" so
 * parenthetical extras (e.g. "Python (PySpark, Pandas...)") don't steal the icon. */
export function getSkillIcon(label: string): SkillIcon {
  const primary = primaryOf(label);
  const brand = BRAND_SLUGS.find(([keyword]) => primary.includes(keyword));
  if (brand) return { kind: 'brand', slug: brand[1] };
  if (CLOUD_SERVICE_KEYWORDS.some((keyword) => primary.includes(keyword))) return { kind: 'cloud' };
  return { kind: 'generic' };
}
