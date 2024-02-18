// import { useState } from 'react'

import { useState } from 'react'
import './App.css'

const App = () => {
	const [counterCards, setCounterCards] = useState(0)
	const [chosenCards, setChosenCards] = useState([])
	const sort = () => {
		return 0.5 - Math.random()
	}
	const emojis = [
		{
			id: 0,
			icon: '🐶',
			isFlipped: false,
		},
		{
			id: 1,
			icon: '🐶',
			isFlipped: false,
		},
		{
			id: 2,
			icon: '🌺',
			isFlipped: false,
		},
		{
			id: 3,
			icon: '🌺',
			isFlipped: false,
		},
		{
			id: 4,
			icon: '🍓',
			isFlipped: false,
		},
		{
			id: 5,
			icon: '🍓',
			isFlipped: false,
		},
		{
			id: 6,
			icon: '❤️',
			isFlipped: false,
		},
		{
			id: 7,
			icon: '❤️',
			isFlipped: false,
		},
		{
			id: 8,
			icon: '🤸‍♀️',
			isFlipped: false,
		},
		{
			id: 9,
			icon: '🤸‍♀️',
			isFlipped: false,
		},
		{
			id: 10,
			icon: '🏝',
			isFlipped: false,
		},
		{
			id: 11,
			icon: '🏝',
			isFlipped: false,
		},
		{
			id: 12,
			icon: '🌈',
			isFlipped: false,
		},
		{
			id: 13,
			icon: '🌈',
			isFlipped: false,
		},
		{
			id: 14,
			icon: '✈️',
			isFlipped: false,
		},
		{
			id: 15,
			icon: '✈️',
			isFlipped: false,
		},
	].sort(sort)
	const [cards, setCards] = useState([...emojis])

	const questionMark = '❓'
	// console.log(emojis[0] === emojis[1])

	const flipCard = id => {
		setCards(prevCards =>
			prevCards.map(card => {
				if (card.id === id) {
					return { ...card, isFlipped: true }
				} else return card
			})
		)
	}

	const handleCardClick = (id, icon) => {
		console.log(id, icon)

		if (counterCards < 2) {
			if (chosenCards.length === 1) {
				flipCard(id)
				setCounterCards(preValue => preValue + 1)
				setChosenCards(prev => [...prev, { id, icon }])
			} else {
				flipCard(id)
				setCounterCards(preValue => preValue + 1)
				setChosenCards(prev => [...prev, { id, icon }])
			}
		}
		checkForMatch()
	}

	const checkForMatch = () => {
		// setChosenCards(prev => [...prev])
		console.log(chosenCards)
		if (chosenCards.length === 2) {
			const [first, second] = chosenCards
			if (first.icon === second.icon) {
				console.log('card match')
			} else {
				console.log('not match')
			}
		}
	}

	return (
		<>
			<div className='text-center'>
				<h1 className='my-12 text-2xl'>Memory Game</h1>
				<div className='grid grid-cols-4 gap-5 justify-items-center content-center'>
					{cards.map(({ id, icon, isFlipped }) => (
						<div
							className={`flex justify-center items-center w-24 h-24 rounded-md cursor-pointer transition-transform hover:scale-110 ${
								isFlipped ? ' bg-neutral-400' : 'bg-yellow-400'
							}`}
							key={id}
							id={id}
							onClick={() => handleCardClick(id, icon)}
						>
							<span className='scale-150'>
								{isFlipped ? icon : questionMark}
							</span>
						</div>
					))}
				</div>
				<p>{counterCards}</p>
				<button className='w-2/4 py-3 px-6 mt-12 cursor-pointer rounded-md border-2 border-solid text-xl bg-rose-300 border-rose-300 transition-colors hover:bg-white hover:text-rose-300 '>
					Reset
				</button>
			</div>
		</>
	)
}

export default App
