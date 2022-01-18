<template>
  <div class="mx-auto my-6">
    <button
      @click="$emit('userSelect', 'lower')"
      :disabled="buttonsActive"
      class="mr-3 button button--red"
    >
      Lower
    </button>
    <button
      @click="$emit('userSelect', 'higher')"
      :disabled="buttonsActive"
      class="ml-3 button button--green"
    >
      Higher
    </button>
  </div>
  <button
    v-if="isGameOver"
    @click="$emit('startGame')"
    class="mt-6 button button--green"
  >
    Play Again
  </button>
</template>

<script>
export default {
  props: ['isGameOver', 'buttonsActive'],
  emits: ['userSelect', 'startGame'],
}
</script>

<style>
</style>