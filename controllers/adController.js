import Ad from '../models/adModel.js';
import adService from '../services/adService.js';


export const createAd = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const ad = adService.createAd(title, description, price);
    
        return res.status(201).json({message: ad});
    } catch (err) {
        console.log(err);
        res.status(400).json('Error');
    }
}

export const getAds = async (req, res) => {
    try {
        const ads = await adService.getAds();
        return res.status(200).json({ads});
    } catch (err) {
        console.log(err);
    }
}

export const updateAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.param.id);
        if (!ad) {
            return res.status(404).json('Ad not found');
        }
        if (ad.creator.toString() !== req.user.id && req.user.role !== "admin") { //if client is not creator AND admin
            return res.status(403).send('Forbidden');
        }
        Object.assign(ad, req.body);
        await ad.save();
        res.json({message: 'Updated ad'});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Error update ad'});
    }
}

export const deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.param.id);
        if (!ad) {
            return res.status(404).json('Ad not found');
        }
        if (ad.creator.toString() !== req.user.id && req.user.role !== "admin") { //if not creator and admin
            return res.status(403).send('Forbidden');
        }
        await ad.remove();
        res.json({message: 'Ad deleted'});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Error deleting ad'});
    }
}