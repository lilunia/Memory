import { useState } from 'react'
import { Board } from './components/Board/Board'
import { emojisCards } from './utils/emojisCards'

const App = () => {
	const sort = () => {
		return 0.5 - Math.random()
	}
	const sortedEmojis = emojisCards.sort(sort)
	const [cards, setCards] = useState([...sortedEmojis])

	return (
		<>
			<div className='text-center'>
				<h1 className='my-12 text-2xl'>Memory Game</h1>
				<Board cards={cards} setCards={setCards}></Board>
			</div>
		</>
	)
}

export default App
