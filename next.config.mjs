// @ts-check
/** @typedef {(config?: import("next").NextConfig | undefined) => import("next").NextConfig} NextConfigPlugin */
import withBundleAnalyzerInit from "@next/bundle-analyzer";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
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
  transpilePackages: ["monaco-editor"],
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
      globalAPI: false,
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

export default nextComposePlugins;
