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
	const recommendations = await connection.query(query, queryArgs)

	return recommendations.rows[0]
}


export {
	createRecommendation,
}
