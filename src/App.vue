<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.button {
  padding: 1rem 2rem;
  border: 2px solid #000;
  border-radius: 1rem;

  &:hover {
    border-color: #000;
    background-color: #bbb;
  }

  &:disabled {
    border-color: gray;
    pointer-events: none;
  }

  &--red {
    border-color: red;

    &:hover {
      border-color: red;
      background-color: #ff5c5c;
    }
  }
  &--green {
    border-color: green;

    &:hover {
      border-color: green;
      background-color: #5cff64;
    }
  }
}
</style>
