import mongoose from "mongoose";

export const connect = async () => {
    await mongoose.connect('mongodb+srv://shibunegi:shibu@gymcluster.vu4jivp.mongodb.net/');
}