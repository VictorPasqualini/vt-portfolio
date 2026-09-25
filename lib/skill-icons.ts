// Icon files live in public/icons and were pulled from these sources:
// Simple Icons (cdn.simpleicons.org) for OSS/language brands, IcePanel's copy
// of the official AWS and GCP architecture icon sets (icon.icepanel.io) for
// cloud services, Devicon for Oracle/Cobol, and the project's own site or
// VectorLogoZone for the few Apache marks Simple Icons doesn't carry. They are
// vendored rather than hotlinked so a missing or renamed remote file can't
// silently blank an icon.
//
// A name without an extension is a .svg; the handful published only as raster
// art carry their own, since there is nothing to convert them from.
const ICON_FILES: [string, string][] = [
  ['kubernetes', 'kubernetes'],
  ['docker', 'docker'],
  ['terraform', 'terraform'],
  ['postgresql', 'postgresql'],
  ['mysql', 'mysql'],
  ['mongodb', 'mongodb'],
  ['databricks', 'databricks'],
  // Photon is the Databricks execution engine, not a product with a mark of its own.
  ['photon', 'databricks'],
  ['unity catalog', 'databricks'],
  ['unitycatalog', 'databricks'],
  ['airflow', 'apacheairflow'],
  ['kafka', 'apachekafka'],
  ['spark', 'apachespark'],
  ['flink', 'apacheflink'],
  ['hadoop', 'apachehadoop'],
  ['hive', 'apachehive'],
  ['nifi', 'apachenifi'],
  // Iceberg publishes its mark as art only: the one SVG on the site is the
  // wordmark, which is illegible at the size these marks are drawn.
  ['iceberg', 'apacheiceberg.png'],
  ['sqoop', 'apache'],
  ['kudu', 'apachekudu'],
  ['impala', 'apache'],
  ['elasticsearch', 'elasticsearch'],
  ['grafana', 'grafana'],
  ['datadog', 'datadog'],
  ['metabase', 'metabase'],
  ['rabbitmq', 'rabbitmq'],
  ['gitlab', 'gitlab'],
  ['bitbucket', 'bitbucket'],
  ['git', 'git'],
  ['linux', 'linux'],
  ['python', 'python'],
  ['scala', 'scala'],
  ['java', 'openjdk'],
  ['duckdb', 'duckdb'],
  ['typescript', 'typescript'],
  ['next', 'nextdotjs'],
  ['react', 'react'],
  ['fastapi', 'fastapi'],
  ['rust', 'rust'],
  ['snowflake', 'snowflake'],
  ['dbt', 'dbt'],
  ['redpanda', 'redpanda'],
  // Apache DataFusion's own mark, recoloured off its near-black original.
  ['datafusion', 'datafusion'],
  ['pandas', 'pandas'],
  ['numpy', 'numpy'],
  ['django', 'django'],
  ['oracle', 'oracle'],
  ['cobol', 'cobol'],
  ['power bi', 'powerbi'],
  ['powerbi', 'powerbi'],
  ['terragrunt', 'terragrunt'],
  // Control-M is a BMC product with no standalone logo published — the BMC
  // corporate mark is the closest official asset.
  ['ctrl-m', 'controlm'],
  ['ctrlm', 'controlm'],
  ['control-m', 'controlm'],
  ['bigquery', 'gcp-bigquery'],
  ['cloud storage', 'gcp-cloud-storage'],
  ['compute engine', 'gcp-compute-engine'],
  ['cloud functions', 'gcp-cloud-functions'],
  ['composer', 'gcp-cloud-composer'],
  ['gcp', 'googlecloud'],
  ['glue', 'aws-glue'],
  ['emr', 'aws-emr'],
  ['ec2', 'aws-ec2'],
  ['lambda', 'aws-lambda'],
  ['athena', 'aws-athena'],
  ['msk', 'aws-msk'],
  ['mwaa', 'aws-mwaa'],
  ['sqs', 'aws-sqs'],
  ['eventbridge', 'aws-eventbridge'],
  ['event bridge', 'aws-eventbridge'],
  ['step functions', 'aws-step-functions'],
  ['s3', 'aws-s3'],
  ['rds', 'aws-rds'],
  ['dynamodb', 'aws-dynamodb'],
  ['documentdb', 'aws-documentdb'],
  ['cloudformation', 'aws-cloudformation'],
  ['cloudwatch', 'aws-cloudwatch'],
];

export type InlineIconName = 'database' | 'sync' | 'layers' | 'network' | 'pipeline' | 'steps' | 'tag';

// Concepts and generic terms with no logo anywhere (SQL, DB2, CDC, Delta Lake,
// Medallion, Incremental, CI/CD) get a hand-drawn glyph that says what kind of
// thing it is. See lib/icons.tsx.
const INLINE_KEYWORDS: [string, InlineIconName][] = [
  ['sql', 'database'],
  ['incremental', 'steps'],
  ['lightgbm', 'network'],
  ['db2', 'database'],
  ['cdc', 'sync'],
  ['delta lake', 'layers'],
  ['deltalake', 'layers'],
  ['medallion', 'layers'],
  ['medalhão', 'layers'],
];

function primaryOf(label: string): string {
  return label.split(/[/(]/)[0]?.trim().toLowerCase() ?? '';
}

export type SkillIcon = { kind: 'img'; src: string } | { kind: 'inline'; name: InlineIconName };

/** Matches against the part of the skill label before the first "(" or "/" so
 * parenthetical extras (e.g. "Python (PySpark, Pandas...)") don't steal the icon. */
export function getSkillIcon(label: string): SkillIcon {
  // "CI/CD (Cockpit)" would otherwise be truncated to "ci" by primaryOf.
  if (label.toLowerCase().includes('ci/cd')) return { kind: 'inline', name: 'pipeline' };

  const primary = primaryOf(label);
  const file = ICON_FILES.find(([keyword]) => primary.includes(keyword));
  if (file) {
    const name = file[1];
    return { kind: 'img', src: `/icons/${name.includes('.') ? name : `${name}.svg`}` };
  }

  const inline = INLINE_KEYWORDS.find(([keyword]) => primary.includes(keyword));
  return { kind: 'inline', name: inline ? inline[1] : 'tag' };
}
