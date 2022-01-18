<template>
  <div class="content w-full">
    <div class="flex flex-col mt-6 ml-auto items-center">
      <img v-if="img" :src="img" alt="" class="card mt-6" />
      <GameControls
        @userSelect="onUserSelect"
        @startGame="startGame"
        :isGameOver="isGameOver"
        :buttonsActive="buttonsActive"
      ></GameControls>
    </div>
    <GameScore class="ml-auto mr-12" />
  </div>
</template>

<script>
import games from '@/lib/games'
import GameScore from '@/components/GameScore.vue'
import GameControls from '@/components/GameControls.vue'
import { useRoute } from 'vue-router'
import { mapState, mapMutations } from 'vuex'
import {saveGame} from '@/utils/game'

export default {
  components: {
    GameScore,
    GameControls,
  },
  setup() {
    const route = useRoute()
    const { checkAnswer, getData } = games[route.name]

    return {
      checkAnswer,
      getData,
      saveGame,
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
    buttonsActive() {
      return this.inputsDisabled || this.isGameOver
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
    window.onbeforeunload = () => this.saveGame(this.game)

    if (this.$store.getters['initGame']) {
      await this.startGame()
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
    async onUserSelect(guess) {
      this.guess = guess
      this.disableInputs(true)

      const data = await this.getData(this.handleError)
      const result = this.checkAnswer(this.guess, this.current.data, data)

      this.updateHistory({ data, result, guess: this.guess })
      this.removeTurn()

      if (result) this.updateScore()

      this.disableInputs(false)
    },
    disableInputs(state) {
      this.inputsDisabled = state
    },
    async startGame() {
      const data = await this.getData(this.handleError)
      this.$store.dispatch('createGame', { type: this.$route.name, data })
    },
    handleError() {
      alert('Error has occured')
      this.$router.go('/')
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
