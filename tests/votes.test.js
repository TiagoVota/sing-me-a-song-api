import * as recommendationsService from '../src/services/recommendationsService.js'
import * as recommendationsRepository from '../src/repositories/recommendationsRepository.js'

const sut = recommendationsService


describe('Test castUpVote', () => {
	test('Should incresse the score for existent recommendation', async () => {
		const id = 10
		const recommendation = {
			id,
			name: 'Youtube name',
			youtubeLink: 'https://www.youtube.com/playlist?list=PLpSJMw6H4PFMOJHMULTxKNOEw7g1cBuyP',
			score: 42,
		}
		const upVoted = {
			...recommendation,
			score: recommendation.score + 1
		}

		jest.spyOn(recommendationsRepository, 'findRecommendationById')
			.mockImplementationOnce(() => recommendation)
		jest.spyOn(recommendationsRepository, 'changeScore')
			.mockImplementationOnce(() =>  upVoted)

		const result = await sut.castUpVote({id})

		expect(result).toEqual(upVoted)
	})

	test('Should return null for inexistent recommendation', async () => {
		const id = 10
		const recommendation = undefined

		jest.spyOn(recommendationsRepository, 'findRecommendationById')
			.mockImplementationOnce(() => recommendation)

		const result = await sut.castUpVote({id})

		expect(result).toBeNull()
	})
})
