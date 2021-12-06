import * as recommendationsService from '../services/recommendationsService.js'


const sendRecommendation = async (req, res, next) => {
	const { body: recommendationInfo } = req
	
	try {
		const recommendation = await recommendationsService
			.createRecommendation(recommendationInfo)

		return res.status(201).send(recommendation)

	} catch (error) {
		const { name: errorName, message, status } = error
		
		if (errorName === 'InputsError') return res.status(status).send(message)

		next(error)
	}
}

const sendUpVote = async (req, res, next) => {
	const { id } = req.params

	try {
		const recommendation = await recommendationsService.castUpVote({ id })
		
		return res.status(200).send(recommendation)

	} catch (error) {
		const { name: errorName, message, status } = error

		if (errorName === 'InputsError') return res.status(status).send(message)
		if (errorName === 'NoFoundIdError') return res.status(status).send(message)

		next(error)
	}
}

const sendDownVote = async (req, res, next) => {
	const { id } = req.params

	try {
		const recommendation = await recommendationsService
			.castDownVote({ id })
		
		return res.status(200).send(recommendation)

	} catch (error) {
		const { name: errorName, message, status } = error

		if (errorName === 'InputsError') return res.status(status).send(message)
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

	try {
		const recommendations = await recommendationsService
			.listTopRecommendations({ amount })
		
		return res.status(200).send(recommendations)

	} catch (error) {
		const { name: errorName, message, status } = error

		if (errorName === 'InputsError') return res.status(status).send(message)
		if (errorName === 'NoRecommendationsError') return res.status(status).send(message)

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
