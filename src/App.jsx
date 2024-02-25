// import { useState } from 'react'

import { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components/Card/Card'

const App = () => {
	// const [counterCards, setCounterCards] = useState(0)
	const [counterMoves, setCounterMoves] = useState(0)

	const sort = () => {
		return 0.5 - Math.random()
	}

	const emojis = [
		{
			id: 0,
			icon: '🐶',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 1,
			icon: '🐶',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 2,
			icon: '🌺',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 3,
			icon: '🌺',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 4,
			icon: '🍓',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 5,
			icon: '🍓',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 6,
			icon: '❤️',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 7,
			icon: '❤️',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 8,
			icon: '🤸‍♀️',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 9,
			icon: '🤸‍♀️',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 10,
			icon: '🏝',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 11,
			icon: '🏝',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 12,
			icon: '🌈',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 13,
			icon: '🌈',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 14,
			icon: '✈️',
			isFlipped: false,
			isMatched: false,
		},
		{
			id: 15,
			icon: '✈️',
			isFlipped: false,
			isMatched: false,
		},
	].sort(sort)
	const [cards, setCards] = useState([...emojis])
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	// const [checkStatus, setCheckStatus] = useState('?')

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.icon === choiceTwo.icon) {
				setCards(prevCards =>
					prevCards.map(card => {
						if (card.icon === choiceOne.icon) {
							return { ...card, isMatched: true }
						} else return card
					})
				)
				resetTurn()
			} else {
				console.log('those cards do not match')

				setTimeout(() => {
					setCards(prevCards =>
						prevCards.map(card => {
							if (card.icon === choiceOne.icon) {
								return { ...card, isFlipped: false }
							} else return card
						})
					)
					resetTurn()
				}, 1000)
			}
		}
	}, [choiceOne, choiceTwo])
	console.log(cards)

	// const handleCardClick = id => {
	// 	console.log('handleCardClick')
	// 	setCards(prevCards =>
	// 		prevCards.map(card => {
	// 			if (card.id === id) {
	// 				console.log(card.icon)
	// 				return { ...card, isFlipped: true }
	// 			} else return card
	// 		})
	// 	)
	// }
	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setCounterMoves(preValue => preValue + 1)
	}
	return (
		<>
			<div className='text-center'>
				<h1 className='my-12 text-2xl'>Memory Game</h1>
				<div className='grid grid-cols-4 gap-5 justify-items-center content-center'>
					{cards.map(card => (
						<Card
							key={card.id}
							id={card.id}
							icon={card.icon}
							isFlipped={
								card === choiceOne ||
								card === choiceTwo ||
								card.isMatched
							}
							onClick={() => {
								handleChoice(card)
								// setCounterCards(preValue => preValue + 1)
								setCounterMoves(preValue => preValue + 1)
							}}
						></Card>
					))}
				</div>
				<p>Moves {counterMoves}</p>
				{/* {choiceTwo && <p>{checkStatus}</p>} */}
				<button className='w-2/4 py-3 px-6 mt-12 cursor-pointer rounded-md border-2 border-solid text-xl bg-rose-300 border-rose-300 transition-colors hover:bg-white hover:text-rose-300 '>
					Reset
				</button>
			</div>
		</>
	)
}

export default App
