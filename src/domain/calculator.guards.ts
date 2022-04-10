import { OperationTypes } from './calculator.constants';
import { CalculatorContext } from './calcutator.dto';

export const not =
  (fn: any) =>
  (...args: any) =>
    !fn(...args);
export const isZero = (_context: CalculatorContext, event: any) => event.key === 0;
export const isNotZero = not(isZero);
export const isMinus = (context: CalculatorContext, _event: any) => context.isNegated;
export const isNotMinus = not(isMinus);
export const divideByZero = (context: CalculatorContext, _event: any) => {
  return (!context.operand2 || context.operand2 === '0') && context.operator === OperationTypes.DIVISION;
};
export const notDivideByZero = not(divideByZero);
