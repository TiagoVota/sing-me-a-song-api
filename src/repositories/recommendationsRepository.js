import connection from '../database/database.js'


const insertRecommendation = async ({ name, youtubeLink, score }) => {
	const query = `
		INSERT INTO recommendations
			(name, youtube_link, score)
		VALUES
			($1, $2, $3)
		RETURNING
			id, name, youtube_link AS youtubeLink, score;
	`
	const queryArgs = [name, youtubeLink, score]
	const recommendationPromise = await connection.query(query, queryArgs)

	return recommendationPromise.rows[0]
}

const findRecommendationById = async ({ id }) => {
	// TODO: dá para refatorar isso para todos os find serem vertentes do SELECT
	const query = `
		SELECT * FROM recommendations
			WHERE id = $1;
	`
	const recommendationPromise = await connection.query(query, [id])

	return recommendationPromise.rows[0]
}

const changeScore = async ({ id, newScore }) => {
	const query = `
		UPDATE recommendations
		SET score = $1
			WHERE id = $2
		RETURNING *;
	`
	const recommendationPromise = await connection.query(query, [newScore, id])

	return recommendationPromise.rows[0]
}

const deleteRecommendationById = async ({ id }) => {
	const query = `
		DELETE FROM recommendations
			WHERE id = $1;
	`
	await connection.query(query, [id])
}

const selectAllRecommendations = async () => {
	const query = 'SELECT * FROM recommendations;'
	const recommendationPromise = await connection.query(query)

	return recommendationPromise.rows
}

const selectTopRecommendations = async ({ amount }) => {
	const query = `
		SELECT * FROM recommendations
			ORDER BY score DESC
		LIMIT $1;
	`
	const recommendationPromise = await connection.query(query, [amount])

	return recommendationPromise.rows
}


export {
	insertRecommendation,
	findRecommendationById,
	changeScore,
	deleteRecommendationById,
	selectAllRecommendations,
	selectTopRecommendations,
}
