// Verifies every internal link in the built site resolves to a real page or asset.
// Run after `next build`.
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', '.next', 'server', 'app');
const publicDir = path.join(__dirname, '..', 'public');

const walk = (d) =>
  fs
    .readdirSync(d, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

const htmlFiles = walk(appDir).filter((f) => f.endsWith('.html'));
const routes = new Set(
  htmlFiles.map((f) => {
    const rel = path.relative(appDir, f).split(path.sep).join('/').replace(/\.html$/, '');
    return rel === 'index' ? '/' : '/' + rel;
  }),
);
routes.add('/api/search');

const problems = [];
const seen = new Set();
let total = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const from = path.relative(appDir, file);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let href = m[1].replace(/&amp;/g, '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (href.startsWith('/_next/')) continue;
    total++;
    const [pathname] = href.split(/[?#]/);
    const key = pathname;
    if (seen.has(key)) continue;
    seen.add(key);
    const asRoute = pathname.replace(/\/$/, '') || '/';
    if (routes.has(asRoute)) continue;
    if (fs.existsSync(path.join(publicDir, pathname))) continue;
    problems.push(`${from}: ${href}`);
  }
}

console.log(`routes: ${routes.size}, internal links checked: ${total}, unique: ${seen.size}`);
if (problems.length) {
  console.error('BROKEN internal links:');
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log('all internal links resolve');

// Hash anchors: verify the target page contains an element with that id.
const anchorProblems = [];
let anchorsChecked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const from = path.relative(appDir, file);
  for (const m of html.matchAll(/href="(\/[^"#]*)#([^"]+)"/g)) {
    const [, pathname, hash] = m;
    const route = pathname.replace(/\/$/, '') || '/';
    const target = route === '/' ? path.join(appDir, 'index.html') : path.join(appDir, route + '.html');
    if (!fs.existsSync(target)) continue; // already reported above
    anchorsChecked++;
    const targetHtml = fs.readFileSync(target, 'utf8');
    if (!targetHtml.includes(`id="${hash}"`)) anchorProblems.push(`${from}: ${pathname}#${hash}`);
  }
}
console.log(`hash anchors checked: ${anchorsChecked}`);
if (anchorProblems.length) {
  console.error('BROKEN anchors (heading id not found on target page):');
  for (const p of [...new Set(anchorProblems)]) console.error('  ' + p);
  process.exit(1);
}
console.log('all hash anchors resolve');
