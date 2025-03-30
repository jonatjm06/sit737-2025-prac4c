const express = require('express');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

app.use(express.json());

const calculate = (req, res, operation) => {
    const { num1, num2 } = req.body;
    
    if (typeof num1 !== 'number' || (num2 !== undefined && typeof num2 !== 'number')) {
      logger.error('Invalid input: Inputs must be numbers');
      return res.status(400).json({ error: 'Inputs must be numbers' });
    }
    
    let result;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          logger.error('Division by zero error');
          return res.status(400).json({ error: 'Cannot divide by zero' });
        }
        result = num1 / num2;
        break;
      case 'exponentiate':
        result = Math.pow(num1, num2);
        break;
      case 'sqrt':
        if (num1 < 0) {
          logger.error('Square root of a negative number error');
          return res.status(400).json({ error: 'Cannot take square root of a negative number' });
        }
        result = Math.sqrt(num1);
        break;
      case 'modulo':
        result = num1 % num2;
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }
    
    logger.info(`Operation: ${operation}, num1: ${num1}, num2: ${num2}, result: ${result}`);
    res.json({ operation, num1, num2, result });
  };

  app.post('/add', (req, res) => calculate(req, res, 'add'));
  app.post('/subtract', (req, res) => calculate(req, res, 'subtract'));
  app.post('/multiply', (req, res) => calculate(req, res, 'multiply'));
  app.post('/divide', (req, res) => calculate(req, res, 'divide'));
  app.post('/exponentiate', (req, res) => calculate(req, res, 'exponentiate'));
  app.post('/sqrt', (req, res) => calculate(req, res, 'sqrt'));
  app.post('/modulo', (req, res) => calculate(req, res, 'modulo'));


app.listen(PORT, () => {
  console.log(`Calculator microservice running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});