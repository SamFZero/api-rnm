import mongoose from 'mongoose';

const EpisodeReviewSchema = new mongoose.Schema({
    episodeId: {
        type: Number,
        required: true,
        index: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    review: {
        type: String,
        required: false,
        maxlength: 1000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('EpisodeReview', EpisodeReviewSchema);