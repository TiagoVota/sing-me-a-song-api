import * as recommendationsRepository from '../repositories/recommendationsRepository.js'
import * as recommendationsValidation from '../validations/recommendationsValidation.js'

import { validationErrors } from '../validations/handleValidation.js'

import InputsError from '../errors/InputsError.js'
import NoFoundIdError from '../errors/NoFoundIdError.js'
import NoRecommendationsError from '../errors/NoRecommendationsError.js'


const createRecommendation = async (recommendationInfo) => {
	const inputsErrors = validationErrors({
		objectToValid: recommendationInfo,
		objectValidation: recommendationsValidation.validatePostRecommendation
	})
	// TODO: Olá Galdino! Eu fiquei pensando se não poderia colocar esse throw de
	// error na função validationErrors (arquivo handleValidation). Achas que se-
	// ria uma ideia ruim? Essa responsabilidade de falar quando é enviado um erro
	// é do service mesmo ou ela pode ser jogada para outro lugar, tipo a parte de
	// validation?
	if (inputsErrors) throw new InputsError(inputsErrors)

	const recommendation = await recommendationsRepository
		.insertRecommendation({...recommendationInfo, score: 0})
	
	return recommendation
}

const castUpVote = async ({ id }) => {
	const inputsErrors = validationErrors({
		objectToValid: { id },
		objectValidation: recommendationsValidation.validateVoteId
	})
	if (inputsErrors) throw new InputsError(inputsErrors)

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
	const inputsErrors = validationErrors({
		objectToValid: { id },
		objectValidation: recommendationsValidation.validateVoteId
	})
	if (inputsErrors) throw new InputsError(inputsErrors)

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

// TODO: Olá Galdino! Essas próximas quatro funções servem de apoio para reali-
// zar a função acima (choiceRandomRecommendation); eu deixo essas quatro nesse 
// service mesmo, coloco talvez em uma pasta utils ou o que eu faço?
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

const listTopRecommendations = async ({ amount }) => {
	const inputsErrors = validationErrors({
		objectToValid: { amount },
		objectValidation: recommendationsValidation.validateAmount
	})
	if (inputsErrors) throw new InputsError(inputsErrors)

	const topRecommendations = await recommendationsRepository
		.selectTopRecommendations({ amount })
	if (topRecommendations.length === 0) throw new NoRecommendationsError()
	
	return topRecommendations
}


export {
	createRecommendation,
	castUpVote,
	castDownVote,
	choiceRandomRecommendation,
	listTopRecommendations,
}
