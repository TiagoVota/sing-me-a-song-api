import cors from 'cors'
import express from 'express'

import statusRouter from './routers/statusRouter.js'
import recommendationsRouter from './routers/recommendationsRouter.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/status', statusRouter)
app.use('/recommendations', recommendationsRouter)


export default app
