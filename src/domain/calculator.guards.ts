import { OperationTypes } from './calculator.constants';
import { CalculatorContext } from './calculator.dto';

export const not =
  (fn: any) =>
  (...args: any) =>
    !fn(...args);

export const divideByZero = (context: CalculatorContext, _event: any) => {
  return (!context.operand2 || context.operand2 === '0') && context.operator === OperationTypes.DIVISION;
};
export const notDivideByZero = not(divideByZero);

export const hasMemoryValue = (context: CalculatorContext, _event: any) => !!context.memoryValue;
