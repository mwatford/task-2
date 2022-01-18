export const saveGame = (game) => {
  localStorage.setItem('game', JSON.stringify(game))
}
