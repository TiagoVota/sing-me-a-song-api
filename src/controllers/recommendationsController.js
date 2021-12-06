import * as recommendationsService from '../services/recommendationsService.js'
import * as recommendationsRepository from '../repositories/recommendationsRepository.js'
import * as recommendationsValidation from '../validations/recommendationsValidation.js'
import theValidationProceeded from '../validations/handleValidation.js'


const sendRecommendation = async (req, res, next) => {
	const { body: recommendationInfo } = req

	// TODO: Criar middleware(?) para isso aqui
	const isValidSignUp = theValidationProceeded({
		res,
		status: 422,
		objectToValid: recommendationInfo,
		objectValidation: recommendationsValidation.validatePostRecommendation
	})

	if (!isValidSignUp) return
	
	try {
		const recommendation = await recommendationsRepository
			.createRecommendation(recommendationInfo)

		return res.status(201).send(recommendation)

	} catch (error) {
		next(error)
	}
}

const sendUpVote = async (req, res, next) => {
	const { id } = req.params

	// TODO: Fazer validação do id

	try {
		const recommendation = await recommendationsService .castUpVote({ id })
		
		return res.status(200).send(recommendation)

	} catch (error) {
		const { name: errorName, message, status } = error

		if (errorName === 'NoFoundIdError') return res.status(status).send(message)

		next(error)
	}
}

const sendDownVote = async (req, res, next) => {
	const { id } = req.params

	// TODO: Fazer validação do id

	try {
		const recommendation = await recommendationsService
			.castDownVote({ id })
		
		return res.status(200).send(recommendation)

	} catch (error) {
		const { name: errorName, message, status } = error

		if (errorName === 'NoFoundIdError') return res.status(status).send(message)

		next(error)
	}
}

const getRandomRecommendation = async (req, res, next) => {
	try {
		const recommendations = await recommendationsService
			.choiceRandomRecommendation()
		
		return res.status(200).send(recommendations)

	} catch (error) {
		const { name: errorName, message, status } = error

		if (errorName === 'NoRecommendationsError') return res.status(status).send(message)

		next(error)
	}
}

const getTopRecommendations = async (req, res, next) => {
	const { amount } = req.params

	// TODO: Fazer validação do amount

	try {
		const recommendations = await recommendationsRepository
			.selectTopRecommendations({ amount })
		
		return res.status(200).send(recommendations)

	} catch (error) {
		next(error)
	}
}


export {
	sendRecommendation,
	sendUpVote,
	sendDownVote,
	getRandomRecommendation,
	getTopRecommendations,
}
