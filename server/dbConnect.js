import mongoose from "mongoose";
import config from "config";

async function dbConnect() {
  try {
    let dbString = config.get("DB_STRING");

    await mongoose.connect(dbString);
    console.log("Mongo DB is connected");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();
