// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)

  router.options.scrollBehavior = function (to, from, savedPosition) {
    return new Promise((resolve) => {
      router.app.$root.$once('scrollBeforeEnter', () => {
        resolve(savedPosition ? savedPosition : { x: 0, y: 0 })
      })
    })
  }

  head.meta.push({
    name: 'keywords',
    content: 'amazing, wonderful, great, fabulous, delightful',
  })

  head.meta.push({
    name: 'description',
    content: 'We are Ficabo.',
  })

  head.meta.push({
    name: 'author',
    content: 'Ficabo - Building Wonderful Solutions',
  })

  head.meta.push({
    name: 'geo.region',
    content: 'AU',
  })
}
