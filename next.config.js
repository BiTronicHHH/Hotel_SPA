/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}
module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
};
module.exports = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    webpack: (config) => {
        return Object.assign({}, config, {
            externals: Object.assign({}, config.externals, {
                fs: 'fs',
            }),
            module: Object.assign({}, config.module, {
                rules: config.module.rules.concat([{
                        test: /\.md$/,
                        loader: 'emit-file-loader',
                        options: {
                            name: 'dist/[path][name].[ext]',
                        },
                    },
                    {
                        test: /\.md$/,
                        loader: 'raw-loader',
                    }
                ]),
            }),
        });
    }
};
module.exports = nextConfig