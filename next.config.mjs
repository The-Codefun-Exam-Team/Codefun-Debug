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
  outputFileTracingIncludes: {
    "/**/*": ["node_modules/dotenv/**/*"],
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
  transpilePackages: ["monaco-editor"],
  /**
   * @param {import("webpack").Configuration} config
   */
  webpack(config, { isServer }) {
    if (!config.plugins) {
      config.plugins = [];
    }

    // Only add Monaco plugin for client-side builds
    if (!isServer) {
      const monacoPlugin = new MonacoWebpackPlugin({
        languages: ["cpp", "python", "java"],
        filename: "static/[name].worker.js",
        globalAPI: false,
      });
      // @ts-ignore Monaco's webpack types don't seem to be compatible.
      config.plugins.push(monacoPlugin);
    }

    return config;
  },
  experimental: {
    optimizePackageImports: [
      "@/features/auth",
      "@/features/about",
      "@/features/rankings",
      "@/features/problems",
      "@/features/submissions",
      "@/utils",
      "@/components",
      "@/hooks",
      "@/components/icon",
    ],
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
const nextComposePlugins = () =>
  plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

export default nextComposePlugins;
