const withPreact = require('next-plugin-preact');

/** @type {import('next').NextConfig} */
module.exports = withPreact({
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
