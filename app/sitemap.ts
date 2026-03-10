import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devtoolslabs.com';

  const routes = [
    '',
    '/guides',
    '/guides/how-to-decode-jwt',
    '/http-header-parser',
    '/color-palette-generator',
    '/regex-generator',
    '/password-entropy',
    '/html-entity-encoder',
    '/jwt-expiry-checker',
    '/csv-to-json',
    '/json-diff',
    '/uuid-generator',
    '/json-escape-unescape',
    '/json-formatter',
    '/json-validator',
    '/json-to-csv',
    '/jwt-validator',
    '/jwt-generator',
    '/base64-encode-decode',
    '/base64-image-decoder',
    '/url-encode-decode',
    '/html-entity-decoder',
    '/hash-generator',
    '/curl-to-fetch',
    '/query-parser',
    '/timestamp-converter',
    '/cron-parser',
    '/regex-replace',
    '/markdown-table',
    '/sql-formatter',
    '/html-minifier',
    '/css-minifier',
    '/css-clamp-generator',
    '/css-keyframes',
    '/color-contrast-checker',
    '/svg-path-visualizer',
    '/dev-utilities',
    '/json-tools',
    '/encoding-tools',
    '/frontend-tools',
    '/security-tools',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
