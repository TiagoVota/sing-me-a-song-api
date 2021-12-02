import * as recommendationsRepository from '../repositories/recommendationsRepository.js'


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

	if (score <= -4) {
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


export {
	castUpVote,
	castDownVote,
}
