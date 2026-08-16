import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['curlconverter'],
  async redirects() {
    return [
      { source: '/base64-decode', destination: '/base64-encode-decode', permanent: true },
      { source: '/jwt-expiry-checker', destination: '/jwt-decoder', permanent: true },
      { source: '/json-escape-unescape', destination: '/json-unescape', permanent: true },
      { source: '/json-validator', destination: '/json-formatter', permanent: true },
      { source: '/url-encoder', destination: '/url-encode-decode', permanent: true },
      { source: '/url-decoder', destination: '/url-encode-decode', permanent: true },
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
