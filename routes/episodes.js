// src/routes/episodeRoutes.js
import { Router } from 'express';
import {
    createReview,
    getReviewsByEpisode,
    updateReview,
    deleteReview
} from '../controllers/episodeReviewController';

const router = Router();

router.post('/reviews', createReview);

router.get('/:episodeId/reviews', getReviewsByEpisode);

router.put('/reviews/:id', updateReview);

router.delete('/reviews/:id', deleteReview);

export default router;