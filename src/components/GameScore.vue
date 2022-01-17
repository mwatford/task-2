<template>
  <div class="mt-6">
    <h2>Scoreboard</h2>
    <div class="flex flex-col">
      <h3>Score: {{ score }}</h3>
      <h3>Remaining rounds: {{ game.turnsLeft }}</h3>
    </div>
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

<style></style>
