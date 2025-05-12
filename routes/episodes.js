import { Router } from 'express';
import {
    getFavoriteEpisodes,
    addFavoriteEpisode,
    removeFavoriteEpisode,
    updateEpisodeReview
} from '../controllers/episodeController.js';

const router = Router();

router.get('/', getFavoriteEpisodes);

router.post('/', addFavoriteEpisode);

router.delete('/:id', removeFavoriteEpisode);

router.put('/:id/review', updateEpisodeReview);

export default router;