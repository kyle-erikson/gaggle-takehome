import "reflect-metadata";
import logger from "../logger";
import database from "./database";
import server from "./server";

export default async () => {
  try {
    await database();
  } catch (error) {
    logger.error("Error connecting to db", error);
  }

  await server();
  logger.info("Server loaded!");
};
