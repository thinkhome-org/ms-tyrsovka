import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.site.site3.eu",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/rezim-dne-a-provozni-doba",
                destination: "/prakticke-informace",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
