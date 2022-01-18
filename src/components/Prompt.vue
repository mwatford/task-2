<template>
  <div class="flex flex-col justify-center items-center">
    <h1>Resume the previous game?</h1>
    <div class="flex flex-row mt-6">
      <button @click="handleClick(true)" class="button button--green mr-3">YES</button>
      <button @click="handleClick(false)" class="button button--red ml-3">NO</button>
    </div>
  </div>
</template>

<script>
import eventBus from '@/lib/eventBus'

export default {
  methods: {
    handleClick(response) {
      eventBus.emit('resume', response)
    },
  },
}
</script>

<style>
</style>