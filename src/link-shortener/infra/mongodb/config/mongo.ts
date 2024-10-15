import { connect } from "mongoose";

export const mongoConnect = async () => {
  try {
    await connect("mongodb://db:27017", {
      auth: {
        username: "rubinho",
        password: "123",
      },
    });
    console.log("Connected to database");
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};
