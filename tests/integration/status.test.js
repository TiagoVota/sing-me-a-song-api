import supertest from 'supertest'

import '../../src/setup.js'
import app from '../../src/app.js'
import connection from '../../src/database/database.js'


beforeAll(async () => connection.end())

describe('GET /status', () => {
	test('return 200 for valid connection', async () => {
		const result = await supertest(app)
			.get('/status')
		
		expect(result.status).toEqual(200)
	})
})
