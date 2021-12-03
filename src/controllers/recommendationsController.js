import * as recommendationsService from '../services/recommendationsService.js'
import * as recommendationsRepository from '../repositories/recommendationsRepository.js'
import * as recommendationsValidation from '../validations/recommendationsValidation.js'
import theValidationProceeded from '../validations/handleValidation.js'


const errorMsg = {
	404: 'Sem recomendações :(',
	406: 'Id não encontrado!'
}

const sendRecommendation = async (req, res) => {
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
		console.log(error)
		return res.sendStatus(500)
	}
}

const sendUpVote = async (req, res) => {
	const { id } = req.params

	// TODO: Fazer validação do id

	try {
		const recommendation = await recommendationsService
			.castUpVote({ id })
		
		if (recommendation === null) return res.status(406).send(errorMsg[406])

		return res.status(200).send(recommendation)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

const sendDownVote = async (req, res) => {
	const { id } = req.params

	// TODO: Fazer validação do id

	try {
		const recommendation = await recommendationsService
			.castDownVote({ id })
		
		if (recommendation === null) return res.status(406).send(errorMsg[406])

		return res.status(200).send(recommendation)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

const getRandomRecommendation = async (req, res) => {
	try {
		const recommendations = await recommendationsService
			.choiceRandomRecommendation()
		
		if (recommendations === null) return res.status(404).send(errorMsg[404])

		return res.status(200).send(recommendations)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

const getTopRecommendations = async (req, res) => {
	const { amount } = req.params

	// TODO: Fazer validação do amount

	try {
		const recommendations = await recommendationsRepository
			.selectTopRecommendations({ amount })
		
		if (recommendations === null) return res.status(404).send(errorMsg[404])

		return res.status(200).send(recommendations)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}


export {
	sendRecommendation,
	sendUpVote,
	sendDownVote,
	getRandomRecommendation,
	getTopRecommendations,
}
