import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
function isOperator(char: string): boolean {
  return ['+', '-', '*', '/'].includes(char);
}

function performOperation(operand1: number, operator: string, operand2: number): number {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
    default:
      return NaN;
  }
}

function evaluateExpression(expression: string): number {
  const numberStack: number[] = [];
  const operatorStack: string[] = [];
  let currentNumber = '';

  for (const char of expression) {
    if (!isNaN(parseFloat(char))) {
      currentNumber += char;
    } else {
      if (currentNumber) {
        numberStack.push(parseFloat(currentNumber));
        currentNumber = '';
      }

      if (isOperator(char)) {
        while (
          operatorStack.length &&
          precedence(operatorStack[operatorStack.length - 1]) >= precedence(char)
        ) {
          const operator = operatorStack.pop()!;
          const operand2 = numberStack.pop()!;
          const operand1 = numberStack.pop()!;
          const result = performOperation(operand1, operator, operand2);
          numberStack.push(result);
        }
        operatorStack.push(char);
      }
    }
  }

  if (currentNumber) {
    numberStack.push(parseFloat(currentNumber));
  }

  while (operatorStack.length) {
    const operator = operatorStack.pop()!;
    const operand2 = numberStack.pop()!;
    const operand1 = numberStack.pop()!;
    const result = performOperation(operand1, operator, operand2);
    numberStack.push(result);
  }

  return numberStack[0];
}

function precedence(operator: string): number {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    default:
      return 0;
  }
}

export {
  evaluateExpression,
};


app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  try {
    const result = evaluateExpression(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




