/* eslint-disable tsdoc/syntax */
/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  basePath: "/beta",
  experimental: {
    appDir: true,
    extensionAlias: {
      ".js": [".js", ".jsx", ".ts", ".tsx"],
    },
  },
};

module.exports = nextConfig;
