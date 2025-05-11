import mongoose from 'mongoose';

const QRCodeSchema = new mongoose.Schema({
    rawValue: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    scannedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model('QRCode', QRCodeSchema);