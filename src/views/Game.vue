<template>
  <div class="content w-full">
    <div class="flex flex-col mt-6 ml-auto items-center">
      <router-view />
      <img v-if="img" :src="img" alt="" class="card mt-6" />
      <div class="mx-auto my-6">
        <button
          @click="() => onUserSelect('lower')"
          :disabled="inputsDisabled"
          class="mr-3 button button--red"
        >
          Lower
        </button>
        <button
          @click="() => onUserSelect('higher')"
          :disabled="inputsDisabled"
          class="ml-3 button button--green"
        >
          Higher
        </button>
      </div>
    </div>
    <GameScore class="ml-auto mr-12" />
  </div>
</template>

<script>
import games from '@/lib/games'
import GameScore from '@/components/GameScore.vue'
import { useRoute } from 'vue-router'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    GameScore,
  },
  setup() {
    const route = useRoute()
    const { checkAnswer, getData } = games[route.name]

    return {
      checkAnswer,
      getData,
    }
  },
  data() {
    return {
      guess: '',
      inputsDisabled: false,
    }
  },
  computed: {
    ...mapState({
      game: state => state.game,
    }),
    current() {
      return this.game.history.at(-1) ?? false
    },
    img() {
      switch (this.game.type) {
        case 'dice': {
          return `http://roll.diceapi.com/images/poorly-drawn/d6/${this.current.data.value}.png`
        }
        case 'card': {
          return this.current.data.image
        }
        default:
          return ''
      }
    },
    isGameOver() {
      return this.$store.getters['isGameOver']
    },
  },
  async created() {
    window.onbeforeunload = this.saveGame

    if (this.$store.getters['initGame']) {
      const data = await this.getData()
      this.$store.dispatch('createGame', { type: this.$route.name, data })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!from.name) next('/')
    else next()
  },
  methods: {
    ...mapMutations({
      updateHistory: 'UPDATE_HISTORY',
      removeTurn: 'REMOVE_TURN',
      updateScore: 'UPDATE_SCORE',
    }),
    saveGame() {
      localStorage.setItem('game', JSON.stringify(this.game))
    },
    async onUserSelect(guess) {
      this.guess = guess
      this.disableInputs(true)

      const data = await this.getData()
      const result = this.checkAnswer(this.guess, this.current.data, data)

      this.updateHistory({ data, result, guess: this.guess })
      this.removeTurn()

      if (result) this.updateScore()
      if (this.isGameOver) return this.disableInputs(true)

      this.disableInputs(false)
    },
    disableInputs(state) {
      this.inputsDisabled = state
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
}
.card {
  width: 240px;
  height: auto;
}
</style>
