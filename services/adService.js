
const adService = {
    getAds: async (id) => {
        const ads = await Ad.find();
        return ads;
    },

    createAd: async (user_id, title, description, price) => {
        const ad = new Ad({title, description, price, creator: user_id});
        await ad.save();
        return ad;
    },

    updateAd: async (id) => {
        const ad = await Ad.findById(id, user);
        if (ad.creator.toString() !== user.id && user.role !== "admin") { //if client is not creator AND admin
            throw new Error("You are not allowed to edit this ad");
        }
        Object.assign(ad, req.body);
        await ad.save();
        return ad;
    },

    deleteAd: () => {
        
    }
}

export default adService;