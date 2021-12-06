import { Router } from 'express'
import * as recommendationsController from '../controllers/recommendationsController.js'


const router = new Router()

router.post('', recommendationsController.sendRecommendation)
router.post('/:id/upvote', recommendationsController.sendUpVote)
router.post('/:id/downvote', recommendationsController.sendDownVote)

router.get('/random', recommendationsController.getRandomRecommendation)
router.get('/top/:amount', recommendationsController.getTopRecommendations)


export default router
