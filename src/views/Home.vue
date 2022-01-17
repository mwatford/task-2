<template>
  <div class="home">
    <GameSelect></GameSelect>
  </div>
</template>

<script>
// @ is an alias to /src
import GameSelect from '../components/GameSelect.vue'

export default {
  name: 'Home',
  components: {
    GameSelect,
  },
}
</script>
