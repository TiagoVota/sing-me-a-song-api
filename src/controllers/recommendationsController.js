import * as recommendationsService from '../services/recommendationsService.js'
import * as recommendationsRepository from '../repositories/recommendationsRepository.js'
import * as recommendationsValidation from '../validations/recommendationsValidation.js'
import theValidationProceeded from '../validations/handleValidation.js'


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


export {
	sendRecommendation,
}