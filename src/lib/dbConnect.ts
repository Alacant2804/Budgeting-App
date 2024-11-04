import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection in development.
 * This avoids creating multiple connections in serverless environments.
 **/
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If connection is already established, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create one and store it in the cache
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    } 
    
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
    
  }
  
  // Await the promise and cache the resolved connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
