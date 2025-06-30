/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // 타입 오류는 체크하되 ESLint만 무시
  },
};

module.exports = nextConfig;
