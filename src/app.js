import cors from 'cors'
import express from 'express'

import * as recommendationsController from './controllers/recommendationsController.js'


const app = express()

app.use(cors())
app.use(express.json())

app.get('/status', (_, res) => res.sendStatus(200))

app.post('/recommendations', recommendationsController.sendRecommendation)
app.post('/recommendations/:id/upvote', (_, res) => res.sendStatus(200))
app.post('/recommendations/:id/downvote', (_, res) => res.sendStatus(200))

app.get('/recommendations/random', (_, res) => res.sendStatus(200))
app.get('/recommendations/top/:amount', (_, res) => res.sendStatus(200))


export default app
