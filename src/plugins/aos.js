import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

class AosPlugin {
  constructor() {
    // AOS config
    this.config = {}
  }

  install(Vue) {
    AOS.init(this.config)

    Vue.mixin({
      updated() {
        this.$nextTick(function () {
          AOS.refreshHard() // This is needed to avoid the un-animate aos effect
        })
      },
    })
  }
}

Vue.use(new AosPlugin())
