const winston = require('winston');
const path = require('path');

const logDirectory = path.join(__dirname, 'logs');

const colorsConfig = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'cyan'
};

const colorizer = winston.format.colorize({ all: true, colors: colorsConfig });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...args }) => {
      const coloredLevel = colorizer.colorize(level, `[${level.toUpperCase()}]`);
      return `${timestamp} ${coloredLevel}: ${message} ${
        Object.keys(args).length > 0 ? JSON.stringify(args, null, 2) : ''
      }`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') })
  ]
});

module.exports = logger;
