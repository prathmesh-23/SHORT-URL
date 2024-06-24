import mongoose from "mongoose";

export async function connectMongo(url) {
  return mongoose.connect(url);
}