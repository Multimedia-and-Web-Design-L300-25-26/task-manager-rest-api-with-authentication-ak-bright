import dotenv from "dotenv";
import mongoose from "mongoose";

// Load test environment variables
dotenv.config({ path: ".env.test" });

import app from "../src/app.js";

// Connect to test database before tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  // Clean database at start
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Disconnect and clean up after all tests
afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  await mongoose.connection.close();
});

export default app;