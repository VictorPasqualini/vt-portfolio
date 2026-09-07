/**
 * Renders the social preview cards to public/og-en.png and public/og-pt.png.
 *
 * Run with `npm run og` after changing the card design or the strings below;
 * the PNGs are committed, so a normal build never runs this.
 *
 * Next's `opengraph-image.tsx` convention would do the same thing at build time,
 * but its bundled @vercel/og resolves its own font and wasm assets with
 * path.join(import.meta.url, '../asset'), which yields an invalid file URL on
 * Windows and fails the export. So the bundle is copied to a temp directory,
 * that one expression is fixed, and the copy is used to render the images.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = path.resolve(import.meta.dirname, '..');
const source = path.join(projectRoot, 'node_modules', 'next', 'dist', 'compiled', '@vercel', 'og');
const workDir = path.join(os.tmpdir(), 'vt-portfolio-og');

fs.rmSync(workDir, { recursive: true, force: true });
fs.cpSync(source, workDir, { recursive: true });

const entry = path.join(workDir, 'index.node.js');
fs.writeFileSync(
  entry,
  fs
    .readFileSync(entry, 'utf8')
    .replace(
      /fileURLToPath\(join\(import\.meta\.url, "\.\.\/([^"]+)"\)\)/g,
      'join(fileURLToPath(new URL(".", import.meta.url)), "$1")',
    ),
);

const { ImageResponse } = await import(pathToFileURL(entry).href);

// Matches the dark "coffee" theme in app/globals.css.
const BG = '#1c130f';
const FG = '#ede0d1';
const ACCENT = '#d99e5c';
const STACK = ['Spark', 'Kafka', 'Airflow', 'Databricks', 'AWS', 'GCP'];

const COPY = {
  en: { availability: 'Open to opportunities', role: 'Data Engineer', location: 'São Paulo, Brazil' },
  pt: { availability: 'Aberto a oportunidades', role: 'Engenheiro de Dados', location: 'São Paulo, Brasil' },
};

// satori accepts plain {type, props} nodes, so no JSX build step is needed here.
// Every element with more than one child must declare display: flex.
const el = (type, style, children) => ({ type, props: { style, children } });

function card({ availability, role, location }) {
  return el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: BG,
      color: FG,
      padding: '72px 80px',
    },
    [
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { display: 'flex', alignItems: 'center', fontSize: 26, color: ACCENT, marginBottom: 24 }, [
          el('div', { width: 14, height: 14, borderRadius: 7, background: ACCENT, marginRight: 14 }, ''),
          el('div', { display: 'flex' }, availability),
        ]),
        el(
          'div',
          { display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 },
          'Victor Pasqualini',
        ),
        el('div', { display: 'flex', fontSize: 40, color: 'rgba(237, 224, 209, 0.65)' }, `${role} · ${location}`),
      ]),
      el(
        'div',
        { display: 'flex' },
        STACK.map((item) =>
          el(
            'div',
            {
              display: 'flex',
              fontSize: 28,
              padding: '10px 26px',
              marginRight: 16,
              borderRadius: 999,
              border: '2px solid rgba(237, 224, 209, 0.22)',
              color: 'rgba(237, 224, 209, 0.85)',
            },
            item,
          ),
        ),
      ),
    ],
  );
}

for (const [locale, copy] of Object.entries(COPY)) {
  const response = new ImageResponse(card(copy), { width: 1200, height: 630 });
  const buffer = Buffer.from(await response.arrayBuffer());
  const target = path.join(projectRoot, 'public', `og-${locale}.png`);
  fs.writeFileSync(target, buffer);
  console.log(`${path.relative(projectRoot, target)} — ${buffer.length} bytes`);
}

fs.rmSync(workDir, { recursive: true, force: true });
