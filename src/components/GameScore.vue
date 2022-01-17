<template>
  <div class="mt-6">
    <h2>Scoreboard</h2>
    <div class="flex flex-col">
      <h3>Score: {{ score }}</h3>
      <h3>Remaining rounds: {{ game.turnsLeft }}</h3>
    </div>
    <table class="history mt-6">
      <thead>
        <th>Turn</th>
        <th>Guess</th>
        <th>Value</th>
      </thead>
      <tbody>
        <tr
          v-for="(el, index) in game.history"
          :key="index"
          :class="getClassList(el, index)"
        >
          <td>{{ index || '-' }}</td>
          <td>{{ el.guess || '-' }}</td>
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
  methods: {
    getClassList(el, index) {
      if (index === 0) return 'header__row'
      return ['history__row', `history__row--${el.result ? 'green' : 'red'}`]
    },
  },
}
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  border: 1px solid black;

  &__row {
    border: 1px solid black;

    &--red {
      background-color: #ff5c5c;
    }

    &--green {
      background-color: #5cff64;
    }
  }


  thead, td, th {
    border: 1px solid black;
  }
}
</style>
