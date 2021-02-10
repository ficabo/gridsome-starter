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
export default {
  name: 'App',
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
