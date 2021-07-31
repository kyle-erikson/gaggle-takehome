import { Application } from "express";
import "reflect-metadata";
import database from "./database";
import server from "./server";

export default async (app: Application) => {
  try {
    await database();
  } catch (error) {
    console.log("error connecting to db", error);
  }

  await server(app);
  console.log("Server loaded!");
};
