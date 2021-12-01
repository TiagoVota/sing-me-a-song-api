import supertest from 'supertest'
import '../src/setup.js'
import app from '../src/app.js'
import connection from '../src/database/database.js'


afterAll(async () => connection.end())

describe('END /route', () => {

})

