class NoFoundIdError extends Error {
	constructor(recommendationId) {
		super(recommendationId)
		this.name = 'NoFoundIdError'
		this.message = `Não existe recomendações com id ${recommendationId}!`
		this.status = 406
	}
}


export default NoFoundIdError
