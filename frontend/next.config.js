   /** @type {import('next').NextConfig} */
   const nextConfig = {
    output: 'export',
    trailingSlash: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
  };

  module.exports = nextConfig;