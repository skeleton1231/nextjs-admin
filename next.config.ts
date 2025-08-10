import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "consciousitems.com",
			},
			{
				protocol: "https",
				hostname: "*.consciousitems.com",
			},
			{
				protocol: "https",
				hostname: "cdn.shopify.com",
			},
		],
	},
};

export default nextConfig;
