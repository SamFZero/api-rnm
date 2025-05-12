import EpisodeReview from '../models/EpisodeReview.js';

export const getFavoriteEpisodes = async (req, res, next) => {
    try {
        const episodes = await EpisodeReview.find({ isFavorite: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: episodes.length,
            data: episodes
        });
    } catch (err) {
        next(err);
    }
};

export const addFavoriteEpisode = async (req, res, next) => {
    try {
        const episodeData = req.body;

        const existingEpisode = await EpisodeReview.findOne({ id: episodeData.id });
        if (existingEpisode) {
            return res.status(400).json({
                success: false,
                message: 'Episode already exists in favorites'
            });
        }

        const newFavorite = new EpisodeReview({
            ...episodeData,
            isFavorite: true
        });

        const savedEpisode = await newFavorite.save();

        res.status(201).json({
            success: true,
            data: savedEpisode
        });
    } catch (err) {
        next(err);
    }
};

export const removeFavoriteEpisode = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedEpisode = await EpisodeReview.findOneAndDelete({ id: Number(id) });

        if (!deletedEpisode) {
            return res.status(404).json({
                success: false,
                message: 'Episode not found in favorites'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

export const updateEpisodeReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;

        const updatedEpisode = await EpisodeReview.findOneAndUpdate(
            { id: Number(id) },
            { rating, review },
            { new: true, runValidators: true }
        );

        if (!updatedEpisode) {
            return res.status(404).json({
                success: false,
                message: 'Episode not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedEpisode
        });
    } catch (err) {
        next(err);
    }
};