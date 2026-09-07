const ICON_SLUGS: [string, string][] = [
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

/** Matches against the part of the skill label before the first "(" or "/" so
 * parenthetical extras (e.g. "Python (PySpark, Pandas...)") don't steal the icon. */
export function getSkillIconSlug(label: string): string | null {
  const primary = label.split(/[/(]/)[0]?.trim().toLowerCase() ?? '';
  const match = ICON_SLUGS.find(([keyword]) => primary.includes(keyword));
  return match ? match[1] : null;
}
