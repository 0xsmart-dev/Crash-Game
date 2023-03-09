import environment from "./index";
import mongoose from "mongoose";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(environment.dbUrl)
    .then(() => {
      console.log("Database was connected successfully!");
    })
    .catch((err) => {
      console.log("Error connecting to the database");
      console.log(err);
      process.exit();
    });
};
