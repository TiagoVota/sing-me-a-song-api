import * as recommendationsService from '../../src/services/recommendationsService.js'
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js'

import NoRecommendationsError from '../../src/errors/NoRecommendationsError.js'

const sut = recommendationsService


describe('Test choiceRandomRecommendation', () => {
	const [bestRecommendations, worstRecommendations] = [
		[{score: 11}, {score: 42}, {score: 4242}],
		[{score: 10}, {score: -4}, {score: -5}]
	]
	const types = { 
		'best': 0.6,
		'worst': 0.8
	}

	jest.spyOn(Math, 'floor').mockImplementation((num) => num - (num % 1))

	
	test('Should return null for no recommendations', async () => {
		const recommendationList = []
	
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
	
		const errorPromise = sut.choiceRandomRecommendation()
		await expect(errorPromise).rejects.toThrowError(NoRecommendationsError)
	})

	test('Should return best for best and worst recommendations', async () => {
		const recommendationList = [
			...bestRecommendations,
			...worstRecommendations
		]
		const randomResult = types['best']
	
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
		jest.spyOn(Math, 'random').mockImplementationOnce(() => randomResult)
			
		const result = await sut.choiceRandomRecommendation()
			
		expect(result.score).toBeGreaterThan(10)
	})
		
	test('Should return worst for best and worst recommendations', async () => {
		const recommendationList = [
			...bestRecommendations,
			...worstRecommendations
		]
		const randomResult = types['worst']
			
		jest.spyOn(recommendationsRepository, 'selectAllRecommendations')
			.mockImplementationOnce(() => recommendationList)
		jest.spyOn(Math, 'random').mockImplementationOnce(() => randomResult)
	
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
