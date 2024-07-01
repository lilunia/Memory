export const Card = ({ id, icon, isFlipped, onClick }) => {
	const questionMark = '❓'

	return (
		<div
			className={`flex justify-center items-center w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-md cursor-pointer transition-transform hover:scale-110 ${
				isFlipped ? ' bg-neutral-400' : 'bg-yellow-400'
			}`}
			key={id}
			id={id}
			onClick={onClick}
		>
			<span className='scale-150'>{isFlipped ? icon : questionMark}</span>
		</div>
	)
}
