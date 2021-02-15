// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const clientConfig = require('./client-config')

module.exports = {
  siteName: 'Ficabo - Gridsome Starter',
  siteDescription: 'A gridsome starter for new projects, maintained by Ficabo',
  siteUrl: 'https://www.ficabo.com.au',
  chainWebpack: (config, { isProd, isClient }) => {
    config.module
      .rule('typescript')
      .use()
      .loader('ts-loader')
      .options({ transpileOnly: true })
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
            disallow: ['/policies/*', '/admin$', '/admin/*'],
          },
        ],
      },
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
        disableServiceWorker: false,
        serviceWorkerPath: 'service-worker.js',
        manifestPath: 'manifest.json',
        cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
        startUrl: '/',
        title: 'Ficabo',
        name: 'Ficabo',
        shortName: 'Ficabo',
        description: 'Ficabo - Building Wonderful Solutions',
        display: 'standalone',
        themeColor: '#6366F1',
        msTileColor: '#6366F1',
        backgroundColor: '#6366F1',
        statusBarStyle: 'default',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        appleMaskIconColor: '#666600',
        lang: 'en-AU',
        icon: 'static/icon.png',
        maskableIcon: true,
      },
    },
  ],
}
