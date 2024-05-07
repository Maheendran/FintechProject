// import  { Connection } from 'mongoose';
// import mongoose, { Mongoose } from 'mongoose';
// const MONGODB_URI: string = process.env.MONGODB_URI!;


// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// let cachedDb: Mongoose | null = null;

// const dbConnect = async (): Promise<Mongoose> => {
  
//   if (cachedDb) {
//     return cachedDb;
//   }

//   const db: Mongoose = await mongoose.connect(MONGODB_URI, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
  
//   });

//   cachedDb = db;
//   return db;
// };

// export default dbConnect;

import mongoose, { ConnectOptions, Mongoose } from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const options = {};

let clientPromise: Promise<Mongoose>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalMongo = global as typeof globalThis & {
    isConnected?: Promise<Mongoose>;
  };

  if (!globalMongo.isConnected) {
    globalMongo.isConnected = mongoose.connect(uri, options as ConnectOptions);
  }
  clientPromise = globalMongo.isConnected;
} else {
  // In production mode, it's best to not use a global variable.
  try {
    clientPromise = mongoose.connect(uri, options as ConnectOptions);
  } catch (err) {
    console.log(err);
  }
  clientPromise = mongoose.connect(uri, options as ConnectOptions);
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;