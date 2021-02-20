import clientConfig from '../../client-config.js'

class MetaInfoPlugin {
  install(Vue) {
    Vue.mixin({
      methods: {
        $metaInfoBuilder(options) {
          const metaInfo = {
            // title here will respect global titleTemplate per usual
            title: `${options.title} - ${clientConfig.site.name}`,
            // cater for the required meta tags which will be used
            meta: [
              {
                key: 'og:title',
                name: 'og:title',
                content: options.title,
              },
              {
                name: 'description',
                property: 'og:description',
                content:
                  options.description && options.description.length > 300
                    ? `${options.description.substring(0, 300)}...`
                    : options.description,
              },
              {
                key: 'og:image',
                property: 'og:image',
                content: options.image,
              },
              {
                name: 'twitter:image:alt',
                content: options.imageAlt,
              },
              {
                name: 'robots',
                content: options.robots,
              },
            ],
            // script, link, style could also be handled here
          }
          // remove meta tags which have no content
          let i = metaInfo.meta.length
          while (i--) {
            if (!metaInfo.meta[i].content) {
              metaInfo.meta.splice(i, 1)
            }
          }
          // return the compiled metaInfo with full tags
          return metaInfo
        },
      },
    })
  }
}

export default new MetaInfoPlugin()
