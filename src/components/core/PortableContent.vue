<template>
  <BlockContent
    v-if="blocks"
    :blocks="blocks"
    :serializers="Object.assign(defaultSerializers, serializers)"
    :class-name="className"
    :project-id="projectId || $static.metadata.sanityOptions.projectId"
    :dataset="dataset || $static.metadata.sanityOptions.dataset"
    :image-options="Object.assign(defaultImageOptions, imageOptions)"
    :render-container-on-single-child="renderContainerOnSingleChild"
  />
</template>

<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  name: 'PortableContent',
  components: {
    BlockContent,
  },
  props: {
    blocks: {
      type: Array,
      default: () => [],
    },
    serializers: {
      type: Object,
      default: () => {},
    },
    className: {
      type: String,
      default: 'block-content',
    },
    projectId: {
      type: String,
      default: '',
    },
    dataset: {
      type: String,
      default: '',
    },
    imageOptions: {
      type: Object,
      default: () => {},
    },
    renderContainerOnSingleChild: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      defaultImageOptions: {
        auto: 'format',
      },
      defaultSerializers: {
        types: {
          extendedImage: ({ node, children }) => {
            // in the future, the node might specify height, width, blur, etc.
            // also consider processing imageOptions here as per default serializer
            if (!node.asset.url) {
              return (
                <figure>
                  <figcaption>** image not available **</figcaption>
                </figure>
              )
            }
            const url = this.$sanityImg
              .image(node.asset.url)
              .auto('format')
              .url()
            const img = (
              <g-image
                src={url}
                alt={node.altText || 'Image Title Unavailable'}
              />
            )
            // todo: cater for inline images?
            return <figure>{img}</figure>
          },
        },
        marks: {
          internalLink: ({ mark, children }) => {
            const href = mark.reference.internal.publicPath.default
            const title = mark.reference.title
            return (
              <a href={href} title={title}>
                {children}
              </a>
            )
          },
          link: ({ mark, children }) => {
            const { href, blank, title } = mark
            return blank ? (
              <a
                href={href}
                target="_blank"
                rel="noopener"
                title={title || children}
              >
                {children}
              </a>
            ) : (
              <a href={href} title={title || children}>
                {children}
              </a>
            )
          },
        },
      },
    }
  },
}
</script>
