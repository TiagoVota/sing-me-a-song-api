import cors from 'cors'
import express from 'express'

import * as recommendationsController from './controllers/recommendationsController.js'


const app = express()

app.use(cors())
app.use(express.json())

app.get('/status', (_, res) => res.sendStatus(200))

app.post('/recommendations', recommendationsController.sendRecommendation)
app.post('/recommendations/:id/upvote', recommendationsController.sendUpVote)
app.post('/recommendations/:id/downvote', recommendationsController.sendDownVote)

app.get('/recommendations/random', recommendationsController.getRandomRecommendation)
app.get('/recommendations/top/:amount', (_, res) => res.sendStatus(200))


export default app
