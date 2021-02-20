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
  mounted() {
    document.addEventListener('swUpdated', this.promptUserToReload, {
      once: true,
    })
  },
  methods: {
    promptUserToReload() {
      this.$toasted.show('Our site has an update! Reload now?', {
        icon: 'fas fa-hourglass-start',
        position: 'bottom-right',
        className: 'reload-toast',
        action: [
          {
            text: 'Not Now',
            class: 'action-close',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            },
          },
          {
            text: 'Yes Please!',
            class: 'action-reload',
            onClick: () => {
              window.location.reload()
            },
          },
        ],
      })
    },
    beforeEnter() {
      this.$root.$emit('scrollBeforeEnter')
    },
    metaInfo() {
      const pathUrl = `${this.$static.metadata.siteUrl}${this.$route.path}`
      return {
        link: [{ rel: 'canonical', href: pathUrl }],
        meta: [{ property: 'og:url', content: pathUrl }],
      }
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
