import QRCode from '../models/qr.js';

export const saveQR = async (req, res, next) => {
    try {
        const { rawValue, format, location } = req.body;

        const newQR = new QRCode({
            rawValue,
            format,
            location,
        });

        const savedQR = await newQR.save();
        res.status(201).json({
            success: true,
            data: savedQR,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllQRs = async (req, res, next) => {
    try {
        const qrs = await QRCode.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: qrs.length,
            data: qrs,
        });
    } catch (err) {
        next(err);
    }
};

export const syncQRs = async (req, res, next) => {
    try {
        const { qrCodes } = req.body;

        if (!Array.isArray(qrCodes)) {
            return res.status(400).json({
                success: false,
                message: 'qrCodes debe ser un array',
            });
        }

        const results = await QRCode.insertMany(
            qrCodes,
            { ordered: false }
        );

        res.status(201).json({
            success: true,
            insertedCount: results.length,
            data: results,
        });
    } catch (err) {
        if (err.name === 'BulkWriteError' && err.code === 11000) {
            const insertedIds = err.result.result.insertedIds.map(id => id.toString());
            const insertedQRs = qrCodes.filter((_, index) =>
                insertedIds.includes(err.result.result.insertedIds[index].toString())
            );

            return res.status(201).json({
                success: true,
                insertedCount: insertedQRs.length,
                duplicates: qrCodes.length - insertedQRs.length,
                data: insertedQRs,
            });
        }
        next(err);
    }
};