<template>
  <DefaultLayout>
    <transition name="fade" mode="out-in" appear @before-enter="beforeEnter">
      <router-view />
    </transition>
  </DefaultLayout>
</template>

<static-query>
query {
  metadata {
    siteUrl
  }
}
</static-query>

<script>
import DefaultLayout from '@/layouts/Default.vue'

export default {
  name: 'App',
  components: { DefaultLayout },
  methods: {
    beforeEnter() {
      this.$root.$emit('scrollBeforeEnter')
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
