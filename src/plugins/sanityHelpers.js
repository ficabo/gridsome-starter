import clientConfig from '@/../client-config.js'

import imageUrlBuilder from '@sanity/image-url'

class SanityHelpers {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$sanityImg', {
      value: imageUrlBuilder({ ...clientConfig.sanity }),
    })
    Vue.mixin({
      methods: {
        $portableTextToPlain(blocks = [], paragraphSeparator = '\n\n') {
          return !blocks
            ? ''
            : // loop through each block
              blocks
                .map((block) => {
                  // only process blocks with textual content
                  if (block._type !== 'block' || !block.children) {
                    return ''
                  }
                  // join all the spans
                  return block.children.map((child) => child.text).join('')
                })
                // join the paragraphs leaving split by two linebreaks
                .join(paragraphSeparator)
        },
      },
    })
  }
}

export default new SanityHelpers()
