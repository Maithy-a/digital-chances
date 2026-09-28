import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbopackFileSystemCacheForDev: true,
    },
    allowedDevOrigins: ['sponge-in-weekly.ngrok-free.app'],
};

export default nextConfig;
