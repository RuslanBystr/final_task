import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Ad from '../../models/adModel.js';
import User from '../../models/userModel.js';

let mongoServer;
let creator;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    creator = new User({name: "test", email: "email@email.com", phoneNumber: "+380680201343", password: "1222"})
    await creator.save();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

test("adModel test. Create and save successfully", async () => {
    const adData = { title: "test", description: "test@test.com", price: 806980201343, creator: creator._id}
    const ad = new Ad(adData);
    const savedAd = await ad.save();

    expect(savedAd.title).toBe(adData.title);
    expect(savedAd.description).toBe(adData.description);
    expect(savedAd.price).toBe(adData.price);
    expect(savedAd.creator).toBe(adData.creator._id);
});
