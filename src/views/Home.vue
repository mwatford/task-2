<template>
  <div class="home pt-12">
    <component :is="component"></component>
  </div>
</template>

<script>
// @ is an alias to /src
import GameSelect from '@/components/GameSelect.vue'
import Prompt from '@/components/Prompt.vue'
import { mapActions } from 'vuex'
import { shallowRef } from 'vue'
import eventBus from '@/lib/eventBus'

export default {
  name: 'Home',
  setup() {
    let component = shallowRef(
      localStorage.getItem('game') ? Prompt : GameSelect
    )

    return { component }
  },
  created() {
    eventBus.on('resume', this.handleResume)
  },
  methods: {
    ...mapActions(['loadGame']),
    handleResume(response) {
      if (response) {
        this.$store.dispatch('loadGame')
        return this.$router.push({
          name: this.$store.state.game.type,
        })
      }
      this.component = GameSelect
    },
  },
}
</script>
