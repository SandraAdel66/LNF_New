// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    ssr: true,
    devtools: { enabled: true },
    devServer: {
        port: 8717,
        host: process.env.APP_URL ?? 'lnfederation.test',
        url: process.env.APP_URL ?? 'http://lnfederation.test',
    },
    tailwindcss: {
        cssPath: ['~/assets/css/global.scss', { injectPosition: 'first' }],
        exposeConfig: true,
        config: {},
        viewer: false,
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    image: {
        inject: true,
        quality: 65,
        format: ['webp'],
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        },
    },
    headlessui: {
        prefix: 'Headless',
    },
    imports: {
        dirs: ['./stores'],
    },
    site: {
        url: process.env.APP_URL ?? 'https://lnfederation.test',
        name: 'Logistics Network Federation',
        description:
            'Logistics Network Federation is a premier web development and digital marketing agency specializing in creating stunning, responsive websites and innovative marketing solutions.',
        defaultLocale: 'en',
    },
    nitro: {
        routeRules: {
            '/backend/**': {
                proxy: `${process.env.API_URL ?? 'http://api.lnfederation.test:8715'}/**`,
            },
            '/get-geoip/**': {
                proxy: `http://ip-api.com/json/**`,
            },
        },
        compressPublicAssets: true,
    },
    app: {
        buildAssetsDir: '/lnfederation-app/',
        rootId: '__lnfapp',
        head: {
            title: 'Logistics Network Federation',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                {
                    name: 'description',
                    content:
                        'Logistics Network Federation is a premier web development and digital marketing agency specializing in creating stunning, responsive websites and innovative marketing solutions.',
                },
                { name: 'author', content: 'AMJ Technologies' },
                { name: 'application-name', content: 'Logistics Network Federation' },
                {
                    name: 'keywords',
                    content:
                        'web development, digital marketing, web design, SEO, social media marketing, Logistics Network Federation, responsive websites, online marketing solutions, custom web development, marketing agency',
                },
            ],
            htmlAttrs: {
                lang: 'en',
                dir: 'ltr',
            },
            render: {
                csp: {
                    reportOnly: false, // Set to true to only report violations
                    policies: {
                        'default-src': ["'self'"],
                        'base-uri': ["'self'"],
                        'font-src': ["'self'", 'https://fonts.bunny.net'],
                        'frame-ancestors': ["'self'"],
                        'img-src': ["'self'", 'data:'],
                        'object-src': ["'none'"],
                        'script-src': ["'self'", "'unsafe-inline'", 'https://apis.google.com'],
                        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.bunny.net'],
                        'connect-src': ["'self'", process.env.APP_URL ?? 'https://api.lnfederation.test'],
                    },
                },
            },
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    routeRules: {
        // Don't add any /dashboard/** URLs to the sitemap.xml
        '/dashboard/**': { robots: false },
    },
    sitemap: {
        // exclude all URLs that start with /dashboard
        exclude: ['/dashboard/**'],
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@morev/vue-transitions/nuxt', 'nuxt-headlessui', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/seo', '@nuxt/icon'],
});
