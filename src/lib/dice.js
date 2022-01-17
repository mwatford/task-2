export const getData = async () => {
  const response = await fetch('http://roll.diceapi.com/json/d6')
  const data = await response.json()

  return data.dice[0]
}

export const checkAnswer = (
  guess,
  { value: previousVal },
  { value: currentVal }
) => {
  const result =
    currentVal < previousVal
      ? 'lower'
      : currentVal > previousVal
      ? 'higher'
      : 'equal'

  return guess === result
}

export default {
  getData,
  checkAnswer,
}
