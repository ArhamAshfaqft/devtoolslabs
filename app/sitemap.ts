import fs from 'node:fs';
import path from 'node:path';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://devtoolslabs.com';

function getTopLevelStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'app');
  const entries = fs.readdirSync(appDir, { withFileTypes: true });

  const routes = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith('(') && !name.startsWith('_') && name !== 'api')
    .filter((name) => fs.existsSync(path.join(appDir, name, 'page.tsx')))
    .map((name) => `/${name}`);

  return ['/', ...routes.sort()];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getTopLevelStaticRoutes().map((route) => ({
    url: `${BASE_URL}${route === '/' ? '' : route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
