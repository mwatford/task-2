<template>
  <div class="mt-6">
    <h2>Scoreboard</h2>
    <div class="flex flex-col">
      <h3>Score: {{ score }}</h3>
      <h3>Remaining rounds: {{ game.turnsLeft }}</h3>
    </div>
    <table class="history mt-6">
      <thead>
        <tr>
          <td>Guess</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(el, index) in game.history"
          :key="index"
          :class="[
            'history__row',
            `history__row--${el.result ? 'green' : 'red'}`,
          ]"
        >
          <td>{{ el.guess }}</td>
          <td>{{ el.data.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      required: true,
    },
  },
  computed: {
    score() {
      return parseFloat((this.game.correctGuesses * 0.1).toPrecision(3))
    },
  },
}
</script>

<style lang="scss" scoped>
.history {
  width: 100%;

  &__row {
    &--red {
      background-color: #ff5c5c;
    }

    &--green {
      background-color: #5cff64;
    }
  }
}
</style>
