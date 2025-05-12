import { Router } from 'express';
import {
    getFavoriteEpisodes,
    addFavoriteEpisode,
    removeFavoriteEpisode,
    updateEpisodeReview
} from '../controllers/episodes.js';

const router = Router();

router.get('/', getFavoriteEpisodes);

router.post('/', addFavoriteEpisode);

router.delete('/:id', removeFavoriteEpisode);

router.put('/:id', updateEpisodeReview);

export default router;