import cors from 'cors'
import express from 'express'


const app = express()

app.use(cors())
app.use(express.json())

app.get('/status', (_, res) => res.sendStatus(200))




export default app
