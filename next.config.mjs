/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'  // Assuming Flask runs on localhost:5000
      },
    ]
  },
};

export default nextConfig;
