<template>
  <picture v-if="devices === '3x'" :role="role">
    <source
      v-for="(val, key, index) in sizes"
      :key="index"
      :media="`(min-width: ${val.media}em)`"
      :srcset="`
        ${getSrcSet(val.width)} 1x,
        ${getSrcSet(val.width, 2)} 2x,
        ${getSrcSet(val.width, 3)} 3x
      `"
    />
    <img :alt="alt" :src="src" />
  </picture>
  <picture v-else :role="role">
    <source
      v-for="(val, key, index) in sizes"
      :key="index"
      :media="`(min-width: ${val.media}em)`"
      :srcset="`
        ${getSrcSet(val.width)} 1x,
        ${getSrcSet(val.width, 2)} 2x
      `"
    />
    <img :alt="alt" :src="src" />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Object,
      default() {
        return {
          s: { media: 0, width: 400 },
          m: { media: 48, width: 800 },
          l: { media: 64, width: 1200 },
        }
      },
    },
    alt: {
      type: String,
      default: 'Missing caption',
    },
    role: {
      type: String,
      default: 'img',
    },
    fit: {
      type: String,
      default: 'clip',
    },
    quality: {
      type: Number,
      default: 82,
    },
    w: {
      type: Number,
      default: undefined,
    },
    h: {
      type: Number,
      default: undefined,
    },
    format: {
      type: String,
      default: undefined,
    },
    flipHorizontal: {
      type: Boolean,
      default: false,
    },
    flipVertical: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    src() {
      return this.$sanityImg
        .image(this.image)
        .width(this.w)
        .height(this.h)
        .quality(this.quality)
        .fit(this.fit)
        .format(this.format)
    },
  },
  methods: {
    getSrcSet(w, dpr = 1) {
      if (!this.h) {
        return this.$sanityImg
          .image(this.image)
          .width(w * dpr)
          .quality(this.quality)
          .fit(this.fit)
          .format(this.format)
      }
      return this.$sanityImg
        .image(this.image)
        .width(w * dpr)
        .height(this.getHeightFromWidth(w, this.getAspectRatio()) * dpr)
        .quality(this.quality)
        .fit(this.fit)
        .format(this.format)
    },
    getHeightFromWidth(w, h) {
      return Math.floor(w * h)
    },
    getAspectRatio() {
      return this.h / this.w
    },
  },
}
</script>
