import connection from '../database/database.js'


const createRecommendation = async ({ name, youtubeLink }) => {
	const query = `
		INSERT INTO recommendations
			(name, youtube_link, score)
		VALUES
			($1, $2, $3)
		RETURNING *;
	`
	const queryArgs = [name, youtubeLink, 0]
	const recommendation = await connection.query(query, queryArgs)

	return recommendation.rows[0]
}

const findRecommendationById = async ({ id }) => {
	const query = `
		SELECT * FROM recommendations
			WHERE id = $1;
	`
	const recommendation = await connection.query(query, [id])

	return recommendation.rows[0]
}

const changeScore = async ({ id, newScore }) => {
	const query = `
		UPDATE recommendations
		SET score = $1
			WHERE id = $2
		RETURNING *;
	`
	const recommendation = await connection.query(query, [newScore, id])

	return recommendation.rows[0]
}


export {
	createRecommendation,
	findRecommendationById,
	changeScore,
}
