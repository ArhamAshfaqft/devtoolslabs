const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

// Recursively find all page.tsx files (depth 1 only — direct subdirectories)
const dirs = fs.readdirSync(appDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let fixed = 0;
let skipped = 0;
let errors = [];

for (const dir of dirs) {
  const pagePath = path.join(appDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Skip if already has openGraph in the metadata
  if (content.includes('openGraph:') || content.includes('openGraph :')) {
    skipped++;
    continue;
  }
  
  // Extract the description from metadata
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  if (!descMatch) {
    errors.push(`${dir}: No description found`);
    continue;
  }
  
  const description = descMatch[1];
  const slug = dir;
  const canonicalUrl = `/${slug}`;
  
  // Extract title for OG
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const title = titleMatch ? titleMatch[1] : dir;
  
  // Find the metadata closing: the description line followed eventually by };
  // Strategy: insert openGraph + alternates before the closing }; of metadata
  const metadataRegex = /(export const metadata:\s*Metadata\s*=\s*\{[\s\S]*?)(^\};)/m;
  const match = content.match(metadataRegex);
  
  if (!match) {
    errors.push(`${dir}: Could not find metadata closing`);
    continue;
  }
  
  const escapedTitle = title.replace(/'/g, "\\'");
  const escapedDesc = description.replace(/'/g, "\\'");
  
  const ogAndCanonical = `  openGraph: {
    title: '${escapedTitle}',
    description: '${escapedDesc}',
    url: 'https://devtoolslabs.com${canonicalUrl}',
  },
  alternates: {
    canonical: '${canonicalUrl}',
  },
`;
  
  // Replace: insert before the closing };
  content = content.replace(metadataRegex, `$1${ogAndCanonical}$2`);
  
  fs.writeFileSync(pagePath, content, 'utf8');
  fixed++;
  console.log(`Fixed: ${dir}`);
}

console.log(`\n--- Summary ---`);
console.log(`Fixed: ${fixed}`);
console.log(`Skipped (already has OG): ${skipped}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) {
  errors.forEach(e => console.log(`  ERR ${e}`));
}
