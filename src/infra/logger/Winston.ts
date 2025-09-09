import moment from "moment-timezone";
import winston from "winston";
const { combine, timestamp, errors, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    printf(({ level, message, stack, className, methodName }) => {
      const timestamp = moment()
        .tz("America/Sao_Paulo")
        .format("YYYY-MM-DD HH:mm:ss");
      const msg = (stack || message) as { name: string };
      return `${timestamp} [${level}] [${className}.${methodName}]: ${msg}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
