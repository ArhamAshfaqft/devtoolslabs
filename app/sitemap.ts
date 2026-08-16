import fs from 'node:fs';
import path from 'node:path';
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

function getStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'app');
  const routes = new Set<string>(['/']);

  const visit = (directory: string, segments: string[]) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name === 'api' || entry.name.startsWith('_') || entry.name.startsWith('(') || entry.name.startsWith('[')) continue;

      const childDirectory = path.join(directory, entry.name);
      const childSegments = [...segments, entry.name];

      if (fs.existsSync(path.join(childDirectory, 'page.tsx'))) {
        routes.add(`/${childSegments.join('/')}`);
      }

      visit(childDirectory, childSegments);
    }
  };

  visit(appDir, []);
  return [...routes].sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getStaticRoutes().map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
  }));
}
