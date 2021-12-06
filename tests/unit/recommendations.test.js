import * as recommendationsService from '../../src/services/recommendationsService.js'
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js'

import InputsError from '../../src/errors/InputsError.js'
import NoRecommendationsError from '../../src/errors/NoRecommendationsError.js'

const sut = recommendationsService


describe('Test createRecommendation', () => {
	test('Should throw InputsError for invalid body', async () => {
		const invalidBody = {
			youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
		}

		const errorPromise = sut.createRecommendation(invalidBody)
		await expect(errorPromise).rejects.toThrowError(InputsError)
	})

	test('Should return inserted recommendation', async () => {
		const validBody = {
			name: 'O Único Vídeo Que Você Precisa Sobre Como Controlar A Ansiedade',
			youtubeLink: 'https://www.youtube.com/watch?v=dZJbORri0ro',
		}

		const recommendation = {
			...validBody,
			id: 42,
			score: 0,
		}

		jest.spyOn(recommendationsRepository, 'insertRecommendation')
			.mockImplementationOnce(() => recommendation)
		
		const result = await sut.createRecommendation()

		expect(result).toEqual(recommendation)
	})
})

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

	
	test('Should throw NoRecommendationsError for no recommendations', async () => {
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

describe('Test listTopRecommendations', () => {
	test('Should throw InputsError for invalid amount param', async () => {
		const amount = -42

		const errorPromise = sut.listTopRecommendations({ amount })
		await expect(errorPromise).rejects.toThrowError(InputsError)
	})

	test('Should throw NoRecommendationsError for no recommendations', async () => {
		const amount = 42
		const recommendationList = []
	
		jest.spyOn(recommendationsRepository, 'selectTopRecommendations')
			.mockImplementationOnce(() => recommendationList)
	
		const errorPromise = sut.listTopRecommendations({ amount })
		await expect(errorPromise).rejects.toThrowError(NoRecommendationsError)
	})

	test('Should return tops recommendations', async () => {
		const amount = 42
		const topRecommendations = [{}, {}, {}, {}]

		jest.spyOn(recommendationsRepository, 'selectTopRecommendations')
			.mockImplementationOnce(() => topRecommendations)
		
		const result = await sut.listTopRecommendations({ amount })

		expect(result.length).toBeGreaterThan(0)
		expect(result.length).toBeLessThanOrEqual(amount)
	})
})
