const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, colorize, printf } = format;

const myFormat = printf(info => {
  return `${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    colorize(),
    label({ label: '[app-server]' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

module.exports.log = {
  // Pass in our custom logger, and pass all log levels through.
  custom: logger,
  level: 'info',

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false
};