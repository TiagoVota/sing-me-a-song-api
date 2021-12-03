const choiceRecommendation = (list, type) => {
	const [best, worst] = separateRecommendations(list)
	const selectedList = {
		'best': best,
		'worst': worst,
	}

	if (best.length === 0 || worst.length === 0) return randomElement(list)

	return randomElement(selectedList[type])
}

const separateRecommendations = (list) => {
	const [best, worst] = [[], []]

	list.forEach(recommendation => {
		if (recommendation.score > 10) return best.push(recommendation)
		return worst.push(recommendation)
	})

	return [best, worst]
}

const choiceBestOrWorst = () => (Math.random() < 0.7) ? 'best' : 'worst'
const randomElement = list => list[Math.floor(Math.random() * list.length)]


export {
	choiceRecommendation,
	choiceBestOrWorst,
}
