// @ts-check
/* eslint-disable tsdoc/syntax */
/** @typedef {(config?: import("next").NextConfig | undefined) => import("next").NextConfig} NextConfigPlugin */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  basePath: "/beta",
  modularizeImports: {
    "@/components/?(((\\w*)?/?)*)": {
      transform: "@/components/{{ matches.[1] }}/{{member}}",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
    "@utils/?(((\\w*)?/?)*)": {
      transform: "@utils/{{ matches.[1] }}/{{member}}",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
  },
  /**
   * @param {import("webpack").Configuration} config
   */
  webpack(config) {
    if (!config.plugins) {
      config.plugins = [];
    }
    const monacoPlugin = new MonacoWebpackPlugin({
      languages: ["cpp", "python", "java"],
      filename: "static/[name].worker.js",
    });
    // @ts-ignore Monaco's webpack types don't seem to be compatible.
    config.plugins.push(monacoPlugin);

    return config;
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

module.exports = nextComposePlugins;
