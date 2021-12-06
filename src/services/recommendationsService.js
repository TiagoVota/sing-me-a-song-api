import * as recommendationsRepository from '../repositories/recommendationsRepository.js'

import NoFoundIdError from '../errors/NoFoundIdError.js'
import NoRecommendationsError from '../errors/NoRecommendationsError.js'


const castUpVote = async ({ id }) => {
	const recommendation = await recommendationsRepository
		.findRecommendationById({ id })
		
	if (!recommendation) throw new NoFoundIdError(id)

	const body = {
		id,
		newScore: recommendation.score + 1,
	}
	const upVoted = await recommendationsRepository.changeScore(body)

	return upVoted
}

const castDownVote = async ({ id }) => {
	const recommendation = await recommendationsRepository
		.findRecommendationById({ id })
		
	if (!recommendation) throw new NoFoundIdError(id)

	const { score } = recommendation

	if (score <= -5) {
		await recommendationsRepository.deleteRecommendationById({ id })
		return 'deleted'
	}

	const body = {
		id,
		newScore: score - 1,
	}
	const downVoted = await recommendationsRepository.changeScore(body)

	return downVoted
}

const choiceRandomRecommendation = async () => {
	const list = await recommendationsRepository.selectAllRecommendations()
	
	if (list.length === 0) throw new NoRecommendationsError()
	
	const type = choiceBestOrWorst()
	
	const recommendation = choiceRecommendation(list, type)
	
	return recommendation
}

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
	castUpVote,
	castDownVote,
	choiceRandomRecommendation,
}
