import { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components/Card/Card'

const App = () => {
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
	const [counterMoves, setCounterMoves] = useState(0)
	const [isAllMatched, setIsAllMatched] = useState(false)

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.id === choiceTwo.id) {
				setChoiceTwo(null)
			}
			if (choiceOne.icon === choiceTwo.icon && choiceOne.id !== choiceTwo.id) {
				setCards(prevCards =>
					prevCards.map(card => {
						if (card.icon === choiceOne.icon && choiceOne.id !== choiceTwo.id) {
							return { ...card, isFlipped: true, isMatched: true }
						} else return card
					})
				)
				reset()
			} else {
				setTimeout(() => {
					if (choiceOne.id !== choiceTwo.id) {
						setCards(prevCards =>
							prevCards.map(card => {
								if (card.icon === choiceOne.icon) {
									return { ...card, isFlipped: false }
								} else return card
							})
						)
						reset()
					}
				}, 1000)
			}
			if (choiceOne.id !== choiceTwo.id) {
				setCounterMoves(preValue => preValue + 1)
			}
		}
	}, [choiceOne, choiceTwo])

	useEffect(() => {
		const matchedCards = card => card.isMatched === true

		if (cards.every(matchedCards)) {
			setIsAllMatched(prev => !prev)
		}
	}, [cards])

	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	const reset = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
	}
	const resetBoard = () => {
		reset()
		setCounterMoves(0)
		setCards([...emojis])
		setIsAllMatched(false)
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
								// checkForAllMatch()

								if (
									(choiceOne === null && choiceOne === null) ||
									(choiceOne !== null && choiceTwo === null)
								) {
									handleChoice(card)
								}
							}}
						></Card>
					))}
				</div>
				<p className='pt-4'>Moves: {counterMoves}</p>
				{isAllMatched && (
					<p className='pt-4 text-lg animate-pulse'>
						Congratulations! You have found them all!!! 🎉{' '}
					</p>
				)}
				<button
					onClick={resetBoard}
					className='w-2/4 py-3 px-6 mt-12 cursor-pointer rounded-md border-2 border-solid text-xl bg-rose-300 border-rose-300 transition-colors hover:bg-white hover:text-rose-300 '
				>
					Reset the board
				</button>
			</div>
		</>
	)
}

export default App
