import EpisodeReview from '../models/EpisodeReview';

export const getAllEpisodes = async (req, res, next) => {
    try {
        const episodes = await EpisodeReview.find();
        res.status(200).json({
            success: true,
            count: episodes.length,
            data: episodes,
        });
    } catch (err) {
        next(err);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const { episodeId, rating, review } = req.body;

        const newReview = new EpisodeReview({
            episodeId,
            rating,
            review
        });

        const savedReview = await newReview.save();

        res.status(201).json({
            success: true,
            data: savedReview
        });
    } catch (err) {
        next(err);
    }
};

export const getReviewsByEpisode = async (req, res, next) => {
    try {
        const { episodeId } = req.params;
        const reviews = await EpisodeReview.find({ episodeId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (err) {
        next(err);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;

        const updatedReview = await EpisodeReview.findByIdAndUpdate(
            id,
            { rating, review },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedReview
        });
    } catch (err) {
        next(err);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedReview = await EpisodeReview.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
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