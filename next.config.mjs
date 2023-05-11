// @ts-check
/* eslint-disable tsdoc/syntax */
/** @typedef {(config?: import("next").NextConfig | undefined) => import("next").NextConfig} NextConfigPlugin */
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
});

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
  modularizeImports: {
    "@components/index.(js|ts)": {
      transform: "@components/{{member}}",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
    "@schemas/index.(js|ts)": {
      transform: "@schemas/{{member}}",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
    "@utils/?(((\\w*)?/?)*)/index.(js|ts)": {
      transform: "@utils/{{ matches.[1] }}/{{member}}",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
  },
};

/** @type {NextConfigPlugin[]} */
const plugins = [withBundleAnalyzer];

/**
 * @type {(
 *     phase: string,
 *     { defaultConfig }: { defaultConfig: import("next").NextConfig },
 * ) => import("next").NextConfig}
 */
const nextComposePlugins = () => plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

export default nextComposePlugins;
