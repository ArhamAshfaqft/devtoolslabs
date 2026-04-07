import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['curlconverter'],
  async redirects() {
    return [
      { source: '/bcrypt-generator', destination: '/', permanent: true },
      { source: '/password-entropy', destination: '/', permanent: true },
      { source: '/html-entity-encoder', destination: '/', permanent: true },
      { source: '/jwt-expiry-checker', destination: '/', permanent: true },
      { source: '/json-to-csv', destination: '/', permanent: true },
      { source: '/csv-to-vcard', destination: '/', permanent: true },
      { source: '/csv-to-json', destination: '/', permanent: true },
      { source: '/json-escape-unescape', destination: '/json-formatter', permanent: true },
      { source: '/json-validator', destination: '/json-formatter', permanent: true },
      { source: '/json-schema-validator', destination: '/json-formatter', permanent: true },
      { source: '/ssl-certificate-decoder', destination: '/', permanent: true },
      { source: '/json-to-xml', destination: '/', permanent: true },
      { source: '/env-to-json', destination: '/', permanent: true },
      { source: '/crontab-builder', destination: '/', permanent: true },
      { source: '/url-slug-generator', destination: '/', permanent: true },
      { source: '/json-to-typescript', destination: '/', permanent: true },
      { source: '/json-to-pydantic', destination: '/', permanent: true },
      { source: '/json-to-graphql', destination: '/', permanent: true },
      { source: '/svg-shape-divider', destination: '/', permanent: true },
      { source: '/css-gradient-generator', destination: '/', permanent: true },
      { source: '/grid-generator', destination: '/', permanent: true },
      { source: '/flexbox-generator', destination: '/', permanent: true },
      { source: '/css-triangle-generator', destination: '/', permanent: true },
      { source: '/glassmorphism-generator', destination: '/', permanent: true },
      { source: '/box-shadow-generator', destination: '/', permanent: true },
      { source: '/json-to-go', destination: '/', permanent: true },
      { source: '/chmod-calculator', destination: '/', permanent: true },
      { source: '/htpasswd-generator', destination: '/', permanent: true },
      { source: '/base64-encode-decode', destination: '/', permanent: true },
      { source: '/url-encoder', destination: '/', permanent: true },
      { source: '/url-decoder', destination: '/', permanent: true },
      { source: '/html-entity-decoder', destination: '/', permanent: true },
      { source: '/markdown-table', destination: '/', permanent: true },
      { source: '/sql-formatter', destination: '/', permanent: true },
      { source: '/sql-to-object', destination: '/', permanent: true },
      { source: '/html-minifier', destination: '/', permanent: true },
      { source: '/css-minifier', destination: '/', permanent: true },
      { source: '/css-clamp-generator', destination: '/', permanent: true },
      { source: '/css-keyframes', destination: '/', permanent: true },
      { source: '/color-contrast-checker', destination: '/', permanent: true },
      { source: '/svg-path-visualizer', destination: '/', permanent: true },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        os: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
