import mongoose from 'mongoose';

const EpisodeReviewSchema = new mongoose.Schema({
    // Datos del episodio (los mismos que en tu tipo Episode)
    id: {
        type: Number,
        required: true,
        unique: true  // Asegura que no se dupliquen episodios
    },
    name: {
        type: String,
        required: true
    },
    episode: {  // Este es el código como "S01E03"
        type: String,
        required: true
    },
    air_date: {
        type: String,
        required: true
    },
    characters: [{
        type: String
    }],
    url: {
        type: String
    },
    created: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: false
    },
    review: {
        type: String,
        maxlength: 1000,
        required: false
    },
    isFavorite: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('EpisodeReview', EpisodeReviewSchema);