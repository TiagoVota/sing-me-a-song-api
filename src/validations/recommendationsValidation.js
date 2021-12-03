import joi from 'joi'


// TODO: entender certinho como funciona esse regex
const youtubeUrlRegex = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)

const validatePostRecommendation = joi.object({
	name: joi.string().required(),
	youtubeLink: joi.string().pattern(youtubeUrlRegex).required(),
}).length(2)



export {
	validatePostRecommendation,
}
