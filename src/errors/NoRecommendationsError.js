class NoRecommendationsError extends Error {
	constructor(message) {
		super(message)
		this.name = 'NoRecommendationsError'
		this.message = 'Sem recomendações no nosso banco de dados!'
		this.status = 404
	}
}


export default NoRecommendationsError
