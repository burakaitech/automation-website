/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // Whenever the frontend asks for /api/py/..., forward it to the Python backend
        source: "/api/py/:path*",
        destination: "http://127.0.0.1:8000/api/py/:path*", 
      },
    ];
  },
};

export default nextConfig;
