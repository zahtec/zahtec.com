/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
    compiler: {
        removeConsole: false,
    },
    images: { domains: ['i.scdn.co'] },
    poweredByHeader: false,
    swcMinify: true,
};

export default nextConfig;
