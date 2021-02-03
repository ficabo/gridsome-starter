// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const clientConfig = require('./client-config')

module.exports = {
  siteName: 'Gridsome Starter',
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    },
    {
      use: 'gridsome-source-sanity',
      options: {
        projectId: clientConfig.sanity.projectId,
        dataset: clientConfig.sanity.dataset,
        token: process.env.SANITY_TOKEN,
        overlayDrafts: false,
        watchMode: false,
        graphqlTag: 'default',
      },
    },
  ],
}
