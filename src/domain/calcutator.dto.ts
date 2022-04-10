import { ActionTypes, OperationTypes } from './calculator.constants';

export type Operands =
  | OperationTypes.ADDITION
  | OperationTypes.SUBTRACTION
  | OperationTypes.DIVISION
  | OperationTypes.MULTIPLICATION;

export interface CalculatorContext {
  isPowered: boolean;
  display: string;
  memoryValue?: string;
  operand1?: string;
  operand2?: string;
  operator?: Operands;
}

export type CalculatorEvent = {
  type: ActionTypes;
  value: {
    key?: string | number;
    operator?: Operands;
  };
};
