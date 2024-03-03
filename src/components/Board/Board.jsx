import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import { emojis } from '../../utils/emojis'

export const Board = ({ cards, setCards }) => {
	const [counterMoves, setCounterMoves] = useState(0)
	const [isAllMatched, setIsAllMatched] = useState(false)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	
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
	}, [choiceOne, choiceTwo, setChoiceOne, setChoiceTwo, setCounterMoves, setCards])

	useEffect(() => {
		const matchedCards = card => card.isMatched === true

		if (cards.every(matchedCards)) {
			setIsAllMatched(prev => !prev)
		}
	}, [cards, setIsAllMatched])

	const reset = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
	}

	const resetBoard = () => {
		reset()
		setCards([...emojis])
		setCounterMoves(0)
		setIsAllMatched(false)
	}

	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	return (
		<>
			<div className='grid grid-cols-4 gap-5 justify-items-center content-center'>
				{cards.map(card => (
					<Card
						key={card.id}
						id={card.id}
						icon={card.icon}
						isFlipped={card === choiceOne || card === choiceTwo || card.isMatched}
						onClick={() => {
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
					Congratulations! You have found them all!!! 🎉
				</p>
			)}

			<button
				onClick={() => {
					resetBoard()
				}}
				className='w-2/4 py-3 px-6 my-12 cursor-pointer rounded-md border-2 border-solid text-xl bg-rose-300 border-rose-300 transition-colors hover:bg-white hover:text-rose-300 '
			>
				Reset board
			</button>
		</>
	)
}
