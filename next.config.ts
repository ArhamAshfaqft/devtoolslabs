import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['curlconverter'],
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
