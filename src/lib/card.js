export const getData = async onError => {
  try {
    const response = await fetch(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=1'
    )
    const data = await response.json()

    return data.cards[0]
  } catch (error) {
    onError()
  }
}

export const checkAnswer = (guess, previous, current) => {
  const previousVal = getCardValue(previous)
  const currentVal = getCardValue(current)
  const result =
    currentVal < previousVal
      ? 'lower'
      : currentVal > previousVal
      ? 'higher'
      : 'equal'

  return guess === result
}

const getCardValue = card => {
  const values = {
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  }

  if (card.value in values) return values[card.value]

  return parseInt(card.value)
}

export default {
  getData,
  checkAnswer,
}
