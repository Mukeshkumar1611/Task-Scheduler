const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.prettyPrint(),
  transports: [
    new winston.transports.File({
        filename: 'error.log', 
        level: 'error' 
    }),
    new winston.transports.File({ 
        format: winston.format.prettyPrint(),
        filename: 'logs/tasks.log', 
        level: 'info',
        options: {
            createDirectory: true,
            flags: "a",
        },
    }),
  ],

//   levels: {
//     trace: 0,
//     input: 1,
//     verbose: 2,
//     prompt: 3,
//     debug: 4,
//     info: 5,
//     data: 6,
//     help: 7,
//     warn: 8,
//     error: 9
//   },

//   colors: {
//     trace: 'magenta',
//     input: 'grey',
//     verbose: 'cyan',
//     prompt: 'grey',
//     debug: 'blue',
//     info: 'green',
//     data: 'grey',
//     help: 'cyan',
//     warn: 'yellow',
//     error: 'red'
//   }
});

// logger.add(winston.transports.File, {
//     prettyPrint: true,
//     level: 'info',
//     silent: false,
//     colorize: true,
//     timestamp: true,
//     filename: 'logs/tasks.log',
//     maxsize: 40000,
//     maxFiles: 10,
//     json: false
// });

module.exports = logger;