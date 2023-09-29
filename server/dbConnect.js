import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://jayesh6221:jayesh5620@myclusterj.k9ase8m.mongodb.net/contact"
    );
    console.log("Mongo Db Is Now Connected");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();