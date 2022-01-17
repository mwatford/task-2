<template>
  <div class="content w-full">
    <div class="flex flex-col ml-auto items-center">
      <img v-if="current" :src="current.data.image" alt="" class="card mt-6" />
      <div class="mx-auto my-6">
        <button
          @click="() => onUserSelect('lower')"
          :disabled="inputsDisabled"
          class="mr-3 button button--lower"
        >
          Lower
        </button>
        <button
          @click="() => onUserSelect('higher')"
          :disabled="inputsDisabled"
          class="ml-3 button button--higher"
        >
          Higher
        </button>
      </div>
    </div>
    <GameScore :game="game" class="ml-auto mr-12" />
  </div>
</template>

<script>
import { getData, checkAnswer } from '@/lib/card'
import GameScore from '@/components/GameScore.vue'

export default {
  components: {
    GameScore,
  },
  data() {
    return {
      game: {
        turnsLeft: 30,
        history: [],
        correctGuesses: 0,
      },
      guess: '',
      inputsDisabled: false,
    }
  },
  computed: {
    current() {
      return this.game.history.at(-1) ?? false
    },
  },
  async beforeCreate() {
    const data = await getData()
    this.updateHistory({ data })
  },
  methods: {
    updateHistory(data) {
      this.game.history.push(data)
    },
    async onUserSelect(guess) {
      this.guess = guess
      this.disableInputs(true)
      const data = await getData()
      const result = checkAnswer(this.guess, this.current.data, data)
      this.updateHistory({ data, result, guess: this.guess })
      if (result) this.game.correctGuesses++
      this.game.turnsLeft--
      if (!this.game.turnsLeft) return this.disableInputs(true)
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
.button {
  padding: 1rem 2rem;
  border: 2px solid #000;
  border-radius: 1rem;

  &:disabled {
    border-color: gray;
    pointer-events: none;
  }

  &--lower {
    border-color: red;

    &:hover {
      background-color: #ff5c5c;
    }
  }
  &--higher {
    border-color: green;

    &:hover {
      background-color: #5cff64;
    }
  }
}
</style>
