// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '@/main.css'

import '@/plugins/aos.js'

import clientConfig from '@/../client-config.js'

import '@/plugins/aos.js'
import sanityHelpers from '@/plugins/sanityHelpers.js'
import metaInfoBuilder from '@/plugins/metaInfoBuilder.js'

export default function (Vue, { router, head, isClient }) {
  Vue.config.productionTip = false

  if (isClient && process.env.NODE_ENV === 'production') {
    require('./registerServiceWorker')
  }

  Vue.use(metaInfoBuilder)
  Vue.use(sanityHelpers)

  router.options.scrollBehavior = function (to, from, savedPosition) {
    return new Promise((resolve) => {
      router.app.$root.$once('scrollBeforeEnter', () => {
        resolve(savedPosition ? savedPosition : { x: 0, y: 0 })
      })
    })
  }

  // standard head components
  head.meta.push({
    'http-equiv': 'Content-Type',
    content: 'text/html; charset=utf-8',
  })
  head.meta.push({
    name: 'web_author',
    content: 'Cameron Russell, Ficabo, cam@ficabo.com',
  })
  head.link.push({
    type: 'text/plain',
    rel: 'author',
    href: 'humans.txt',
  })

  // project specific globals - with key (can be overriden)
  head.meta.push({
    key: 'og:type',
    property: 'og:type',
    content: 'website',
  })
  head.meta.push({
    key: 'og:title',
    property: 'og:title',
    content: clientConfig.site.name,
  })
  head.meta.push({
    key: 'og:image',
    property: 'og:image',
    content: clientConfig.site.defaultImgPath,
  })

  // project specific globals - without key (won't be overriden)
  head.meta.push({
    name: 'geo.region',
    content: clientConfig.site.geoRegion,
  })
  head.meta.push({
    name: 'geo.placename',
    content: clientConfig.site.geoPlacename,
  })
  head.meta.push({
    property: 'og:locale',
    content: clientConfig.site.locale,
  })
}
