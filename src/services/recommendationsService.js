import * as recommendationsRepository from '../repositories/recommendationsRepository.js'
import * as recommendationsUtil from '../utils/recommendationsUtil.js'


const castUpVote = async ({ id }) => {
	const recommendation = await recommendationsRepository
		.findRecommendationById({ id })
		
	if (!recommendation) return null

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
		
	if (!recommendation) return null
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
	
	if (list.length === 0) return null
	
	const type = recommendationsUtil.choiceBestOrWorst()
	
	const recommendation = recommendationsUtil.choiceRecommendation(list, type)
	
	return recommendation
}


export {
	castUpVote,
	castDownVote,
	choiceRandomRecommendation,
}
