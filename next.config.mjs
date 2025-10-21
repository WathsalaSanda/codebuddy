/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'sequelize'],
  },
  webpack: (config) => {
    // leave externals alone (no forced externals) — runtime will load mysql2
    return config;
  },
};

export default nextConfig;
