import { createLogger, format, transports } from "winston";

//This is a really simple example for using a global logging framework
export default createLogger({
  level: "info",
  format: format.json(),
  //Can add more transports here for production level logging.
  transports: [new transports.Console({ format: format.simple() })],
});
