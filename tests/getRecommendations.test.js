import * as recommendationsService from '../src/services/recommendationsService.js'
import * as recommendationsRepository from '../src/repositories/recommendationsRepository.js'
import * as recommendationsUtil from '../src/utils/recommendationsUtil.js'

const sut = recommendationsService


describe('Test choiceRandomRecommendation', () => {
	const [bestRecommendations, worstRecommendations] = [
		[{score: 11}, {score: 42}, {score: 4242}],
		[{score: 10}, {score: -4}, {score: -5}]
	]

	test('Should return null for no recommendations', async () => {
		const recommendationList = []
	
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
	
		const result = await sut.choiceRandomRecommendation()
	
		expect(result).toBeNull()
	})

	test('Should return best for best and worst recommendations', async () => {
		const recommendationList = [
			...bestRecommendations,
			...worstRecommendations
		]
		const type = 'best'
	
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
		jest.spyOn(recommendationsUtil, 'choiceBestOrWorst')
			.mockImplementation(() => type)
	
		const result = await sut.choiceRandomRecommendation()
	
		expect(result.score).toBeGreaterThan(10)
	})

	test('Should return worst for best and worst recommendations', async () => {
		const recommendationList = [
			...bestRecommendations,
			...worstRecommendations
		]
		const type = 'worst'
	
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
		jest.spyOn(recommendationsUtil, 'choiceBestOrWorst')
			.mockImplementation(() => type)
	
		const result = await sut.choiceRandomRecommendation()
	
		expect(result.score).toBeLessThanOrEqual(10)
	})
	
	test('Should return a recommendation for only bests', async () => {
		const recommendationList = [
			...bestRecommendations
		]
	
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
	
		const result = await sut.choiceRandomRecommendation()
	
		expect(typeof result.score).toBe('number')
	})
})
