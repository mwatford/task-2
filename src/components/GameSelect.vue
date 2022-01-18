<template>
  <nav>
    <router-link :to="{ path: '/game/dice' }" class="button"
      >Roll a dice</router-link
    >
    <router-link :to="{ path: '/game/card' }" class="button"
      >Pick a card</router-link
    >
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;

  &:not(:last-of-type) {
    margin-right: 2rem;
  }

  &:visited {
    color: black;
  }
}
</style>
