import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.site.site3.eu",
            },
        ],
    },
};

export default nextConfig;
