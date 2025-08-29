import winston from "winston";

const logger = winston.createLogger({
  level: "info", // default level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    // log to console
    new winston.transports.Console(),

    // log to a file
    new winston.transports.File({ filename: "app.log" })
  ],
});

export default logger;
