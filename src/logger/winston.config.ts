/* eslint-disable @typescript-eslint/no-var-requires */
const winston = require('winston');
import 'winston-daily-rotate-file';
const winstonMongoDB = require('winston-mongodb');

const { combine, timestamp, colorize, printf } = winston.format;

const combinedFormats = winston.format.combine(winston.format.timestamp(), winston.format.json());

const transports = [
  new winston.transports.Console({
    format: combine(
      timestamp(),
      colorize(),
      printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
      })
    )
  }),
  new winston.transports.DailyRotateFile({
    filename: 'info_logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: combinedFormats
  }),
  new winstonMongoDB.MongoDB({
    level: 'info',
    db: process.env.MONGO_URI,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    collection: 'info_logs',
    format: combinedFormats
  })
];

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports
});
