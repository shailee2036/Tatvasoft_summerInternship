import mongoose from "mongoose";

export const connectDatabase = () => {
  const MONGOURI = process.env.MONGOURI;
  console.log("asdasd", MONGOURI);
  mongoose
    .connect(MONGOURI!)
    .then(() => {
      console.log("Database Connection Successfull...Yahhh!");
    })
    .catch((error) => {
      console.log("Database Connection failed.");
      console.log("Error is ", error);
    });
};
