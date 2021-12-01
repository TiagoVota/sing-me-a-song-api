import * as recommendationsRepository from '../repositories/recommendationsRepository.js'


const castUpVote = async ({ id }) => {
	const recommendation = await recommendationsRepository
		.findRecommendationById({ id })

	const body = {
		id,
		newScore: recommendation.score + 1,
	}
	const upVoted = await recommendationsRepository.changeScore(body)

	return upVoted
}


export {
	castUpVote,
}
