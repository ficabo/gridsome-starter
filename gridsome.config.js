// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const TerserPlugin = require('terser-webpack-plugin')

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

/* const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin */

module.exports = {
  siteName: clientConfig.site.name,
  siteDescription: clientConfig.site.description,
  siteUrl: clientConfig.site.url,
  titleTemplate: `%s`,
  templates: {},
  chainWebpack: (config, { isProd, isClient }) => {
    config.module
      .rule('typescript')
      .use()
      .loader('ts-loader')
      .options({ transpileOnly: true })
    /* config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]) */
    if (isProd && isClient) {
      config.optimization.splitChunks({
        chunks: 'initial',
        maxInitialRequests: Infinity,
        cacheGroups: {
          vueVendor: {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            name: 'vue-vendors',
          },
          gridsome: {
            test: /[\\/]node_modules[\\/](gridsome|vue-meta)[\\/]/,
            name: 'gridsome-vendors',
          },
          polyfill: {
            test: /[\\/]node_modules[\\/]core-js[\\/]/,
            name: 'core-js',
          },
          icons: {
            test: /[\\/]node_modules[\\/](@fortawesome|@vue-hero-icons)[\\/]/,
            name: 'icon-vendors',
          },
        },
      })
    }
  },
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: isProd
        ? [
            new TerserPlugin({
              terserOptions: {
                warnings: false,
                compress: {
                  drop_console: true,
                },
                output: {
                  beautify: false,
                },
              },
            }),
          ]
        : [],
    },
  },
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        shouldImport: true,
        shouldTimeTravel: true,
        presetEnvConfig: {
          importFrom: 'src/main.css',
        },
      },
    },
    {
      use: 'gridsome-source-sanity',
      options: {
        projectId: clientConfig.sanity.projectId,
        dataset: clientConfig.sanity.dataset,
        token: process.env.SANITY_TOKEN,
        overlayDrafts: false,
        watchMode: process.env.NODE_ENV === 'production' ? false : true,
        graphqlTag: 'default',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: { include: ['/**'] },
    },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        policy: [
          {
            userAgent: '*',
            disallow: ['/404/', '/admin/*', '/search/', '/policies/*'],
          },
        ],
      },
    },
    {
      use: '@allanchain/gridsome-plugin-pwa',
      options: {
        manifestPath: 'manifest.json',
        manifestOptions: {
          short_name: clientConfig.site.shortName,
          description: clientConfig.site.shortDescription,
          display: 'standalone',
          gcm_sender_id: undefined,
          start_url: '/',
          lang: 'en-AU',
          dir: 'auto',
          background_color: clientConfig.site.primaryColor,
        },
        icon: {
          androidChrome: {
            url: 'static/icon-maskable.png',
            maskable: true,
          },
        },
        workboxPluginMode: 'generateSW',
        workboxOptions: {
          cacheId: `${clientConfig.site.shortName
            .toLowerCase()
            .replace(/ /g, '-')}-pwa`,
          globPatterns: [
            '**/*.{html,css,js}',
            '**/*.{png,jpg,jpeg,svg,gif}',
            'assets/data/**/*.json',
            'flexsearch.json',
            'manifest.json',
          ],
          skipWaiting: true,
        },
        themeColor: clientConfig.site.primaryColor,
        msTileColor: clientConfig.site.primaryColor,
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
      },
    },
  ],
}
