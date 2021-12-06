import joi from 'joi'


const youtubeUrlRegex = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)

const validatePostRecommendation = joi.object({
	name: joi.string().required(),
	youtubeLink: joi.string().pattern(youtubeUrlRegex).required(),
}).length(2)

const validateVoteId = joi.object({
	id: joi.number().integer().min(1),
}).length(1)

const validateAmount = joi.object({
	amount: joi.number().integer().min(1),
}).length(1)


export {
	validatePostRecommendation,
	validateVoteId,
	validateAmount,
}
