import { app } from "./loaders/app";
import database from "./loaders/database";
import logger from "./logger";

(async () => {
  try {
    await database();
    await app;
  } catch (error) {
    logger.error("Error loading: ", error);
  }
})();