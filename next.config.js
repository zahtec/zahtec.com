import withPreact from 'next-plugin-preact';

/** @type {import('next').NextConfig} */
const nextConfig = withPreact({
    experimental: {
        esmExternals: false,
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
});

export default nextConfig;
