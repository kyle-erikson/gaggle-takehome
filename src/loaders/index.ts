import "reflect-metadata";
import database from "./database";
import server from "./server";

export default async () => {
  try {
    await database();
  } catch (error) {
    console.log("Error connecting to db", error);
  }

  await server();
  console.log("Server loaded!");
};
