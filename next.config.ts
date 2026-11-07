import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES === "true" ? "/workout-calisthenics" : undefined,
  experimental: {
    useTypeScriptCli: false,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
