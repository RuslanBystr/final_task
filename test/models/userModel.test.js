import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../models/userModel.js';


let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

test("UserModel test. Create and save successfully", async () => {
    const userData = { name: "test", email: "test@test.com", phoneNumber: "+3806980201343", password: "test" }
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.phoneNumber).toBe(userData.phoneNumber);
    expect(savedUser.password).toBe(userData.password);
});
