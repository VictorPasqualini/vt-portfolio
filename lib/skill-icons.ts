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

// AWS has zero product logos on Simple Icons (trademark takedown), so these get
// a hand-drawn "AWS" badge instead of a missing/wrong brand mark.
const AWS_KEYWORDS = [
  'aws',
  'glue',
  'emr',
  'ec2',
  'lambda',
  'sqoop',
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
];

// Neither AWS- nor GCP-specific, but still no brand asset available.
const CLOUD_SERVICE_KEYWORDS = ['kudu', 'impala'];

function primaryOf(label: string): string {
  return label.split(/[/(]/)[0]?.trim().toLowerCase() ?? '';
}

export type SkillIcon = { kind: 'brand'; slug: string } | { kind: 'aws' } | { kind: 'cloud' } | { kind: 'generic' };

/** Matches against the part of the skill label before the first "(" or "/" so
 * parenthetical extras (e.g. "Python (PySpark, Pandas...)") don't steal the icon. */
export function getSkillIcon(label: string): SkillIcon {
  const primary = primaryOf(label);
  const brand = BRAND_SLUGS.find(([keyword]) => primary.includes(keyword));
  if (brand) return { kind: 'brand', slug: brand[1] };
  if (AWS_KEYWORDS.some((keyword) => primary.includes(keyword))) return { kind: 'aws' };
  if (CLOUD_SERVICE_KEYWORDS.some((keyword) => primary.includes(keyword))) return { kind: 'cloud' };
  return { kind: 'generic' };
}
