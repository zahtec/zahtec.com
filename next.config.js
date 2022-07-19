/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
    compiler: {
        removeConsole: true,
    },
    images: { domains: ['i.scdn.co'] },
    poweredByHeader: false,
    swcMinify: true,
};

export default nextConfig;
