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

export type CalculatorStates = 'off' | 'operand1' | 'operand2' | 'operator_entered' | 'result' | 'alertOff';
export type CalculatorStateSchema = {
  [K in keyof CalculatorStates]: Record<string, any>;
};

export type CalculatorEvent = {
  type: ActionTypes;
  value: {
    key?: string | number;
    operator?: Operands;
  };
};
