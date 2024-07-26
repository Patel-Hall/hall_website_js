import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export const connectToMongoDBClient = async (): Promise<any> => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB!");
    return client; // Return the client promise
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error; // Re-throw the error for proper handling
  }
};
