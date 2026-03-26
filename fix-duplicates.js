const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

const dirs = fs.readdirSync(appDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let duplicateCount = 0;

for (const dir of dirs) {
  const pagePath = path.join(appDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Check if "alternates:" appears more than once in the file
  const matches = content.match(/alternates\s*:/g);
  if (matches && matches.length > 1) {
    console.log(`Found duplicate alternates in ${dir}`);
    duplicateCount++;
    
    // The script injected:
    //   alternates: {
    //     canonical: '/...',
    //   },
    // };
    // at the very end of the metadata block.
    // Let's remove the LAST occurrence of the exact block my script injected.
    
    // We expect the end of the metadata to look like this:
    //   },
    //   alternates: {
    //     canonical: '/some-path',
    //   },
    // };
    
    // Regex to match the injected alternates block specifically at the end of the metadata block
    const injectedAlternatesRegex = /\s*alternates:\s*\{\s*canonical:\s*'\/[^']+'\s*,\s*\},(?=\s*\};)/;
    
    if (injectedAlternatesRegex.test(content)) {
      content = content.replace(injectedAlternatesRegex, '');
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`  -> Fixed ${dir}`);
    } else {
      console.log(`  -> Could not automatically fix ${dir}`);
    }
  }
}

console.log(`\nTotal duplicates found and fixed: ${duplicateCount}`);
