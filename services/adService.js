
//Working...

const adService = {
    getAds: async (id) => {
        const ads = await Ad.find().populate('creator');
        return ads;
    },
    createAd: async (title, description, price) => {
        const ad = new Ad({title, description, price, creator: req.user.id});
        await ad.save();
        return ad;
    },
    updateAd: () => {
        //pass
    },
    deleteAd: () => {
        //pass
    }
}