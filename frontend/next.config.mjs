/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // We use an environment variable for Railway deployment, 
    // and fallback to localhost for local testing.
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
    
    return [
      {
        source: "/api/py/:path*",
        destination: `${backendUrl}/api/py/:path*`, 
      },
    ];
  },
};

export default nextConfig;
