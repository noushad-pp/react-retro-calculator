/* eslint-disable @typescript-eslint/naming-convention */
import { createMachine } from 'xstate';

import {
  compute,
  computePercentage,
  computeSqrt,
  memoryValueAdd,
  memoryValueClear,
  memoryValueStore,
  memoryValueSubtract,
  powerOff,
  reset,
  setDecimalPoint,
  setDefaultDisplay,
  setKeyAsDisplay,
  setOperator,
  storeOperand1,
  storeOperand2,
  toggleSign,
  turnCalculatorOn,
} from './calculator.actions';
import { ActionTypes } from './calculator.constants';
import { hasMemoryValue, notDivideByZero } from './calculator.guards';
import { CalculatorContext } from './calcutator.dto';

const defaultContext: CalculatorContext = {
  isPowered: false,
  display: '0',
  memoryValue: undefined,
  operand1: undefined,
  operand2: undefined,
  operator: undefined,
};

const calculatorMachine = createMachine<CalculatorContext>(
  {
    id: 'calculatorMachine',
    context: defaultContext,
    strict: true,
    initial: 'off',
    states: {
      off: {
        on: {
          [ActionTypes.CLEAR_EVERYTHING]: [
            {
              target: 'operand1',
              actions: ['turnCalculatorOn'],
            },
          ],
          '*': 'alertOff',
        },
      },
      operand1: {
        on: {
          [ActionTypes.DIGIT]: {
            actions: ['setKeyAsDisplay', 'storeOperand1'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            actions: ['setDecimalPoint'],
          },
          [ActionTypes.OPERATOR]: {
            target: 'operator_entered',
            actions: ['storeOperand1', 'setOperator'],
          },
          [ActionTypes.PERCENTAGE]: {
            target: 'operand1',
            actions: ['computePercentage', 'storeOperand1'],
          },
          [ActionTypes.SQUARE_ROOT]: {
            target: 'operand1',
            actions: ['computeSqrt', 'storeOperand1'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.MEMORY_RECORD]: {
            actions: ['memoryValueStore'],
          },
          [ActionTypes.MEMORY_CLEAR]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueClear'],
          },
          [ActionTypes.MEMORY_ADD]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueAdd', 'storeOperand1'],
          },
          [ActionTypes.MEMORY_SUBSTRACT]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueSubtract', 'storeOperand1'],
          },
          [ActionTypes.CLEAR_EVERYTHING]: {
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.POWER_OFF]: {
            target: 'off',
            actions: ['powerOff'],
          },
        },
      },
      operator_entered: {
        on: {
          [ActionTypes.OPERATOR]: [
            {
              target: 'operator_entered',
              actions: 'setOperator',
            },
          ],
          [ActionTypes.DIGIT]: {
            target: 'operand2',
            actions: ['setDefaultDisplay', 'setKeyAsDisplay', 'storeOperand2'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            target: 'operand2',
            actions: ['setDecimalPoint', 'saveOperand2'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.PERCENTAGE]: {
            actions: ['computePercentage'],
          },
          [ActionTypes.SQUARE_ROOT]: {
            actions: ['computeSqrt'],
          },
          [ActionTypes.MEMORY_RECORD]: {
            actions: ['memoryValueStore'],
          },
          [ActionTypes.MEMORY_CLEAR]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueClear'],
          },
          [ActionTypes.MEMORY_ADD]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueAdd', 'storeOperand1'],
          },
          [ActionTypes.MEMORY_SUBSTRACT]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueSubtract', 'storeOperand1'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            target: 'operand2',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.CLEAR_EVERYTHING]: {
            target: 'operand1',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.POWER_OFF]: {
            target: 'off',
            actions: ['powerOff'],
          },
        },
      },
      operand2: {
        on: {
          [ActionTypes.DIGIT]: {
            actions: ['setKeyAsDisplay', 'storeOperand2'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            actions: ['setDecimalPoint'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.PERCENTAGE]: {
            target: 'operand2',
            actions: ['computePercentage', 'storeOperand2'],
          },
          [ActionTypes.SQUARE_ROOT]: {
            target: 'operand1',
            actions: ['computeSqrt', 'storeOperand2'],
          },
          [ActionTypes.OPERATOR]: [
            {
              cond: 'notDivideByZero',
              target: 'operator_entered',
              // save the current value to operand 2, compute it and store it to operand 1
              actions: ['storeOperand2', 'compute', 'storeOperand1', 'setOperator'],
            },
            {
              target: 'alert',
            },
          ],
          [ActionTypes.EQUALS]: [
            {
              cond: 'notDivideByZero',
              target: 'result',
              // compute and store it to operand 1
              actions: ['storeOperand2', 'compute', 'storeOperand1'],
            },
            {
              target: 'alert',
            },
          ],
          [ActionTypes.MEMORY_RECORD]: {
            actions: ['memoryValueStore'],
          },
          [ActionTypes.MEMORY_CLEAR]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueClear'],
          },
          [ActionTypes.MEMORY_ADD]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueAdd', 'storeOperand1'],
          },
          [ActionTypes.MEMORY_SUBSTRACT]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueSubtract', 'storeOperand1'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            target: 'operand2',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.CLEAR_EVERYTHING]: {
            target: 'operand1',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.POWER_OFF]: {
            target: 'off',
            actions: ['powerOff'],
          },
        },
      },
      result: {
        on: {
          [ActionTypes.DIGIT]: {
            target: 'operand1',
            actions: ['setKeyAsDisplay'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.PERCENTAGE]: {
            target: 'operand2',
            actions: ['storeOperand1', 'computePercentage'],
          },
          [ActionTypes.SQUARE_ROOT]: {
            target: 'operand1',
            actions: ['storeOperand1', 'computeSqrt'],
          },
          [ActionTypes.OPERATOR]: {
            target: 'operator_entered',
            actions: ['storeOperand1', 'setOperator'],
          },
          [ActionTypes.MEMORY_RECORD]: {
            actions: ['memoryValueStore'],
          },
          [ActionTypes.MEMORY_CLEAR]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueClear'],
          },
          [ActionTypes.MEMORY_ADD]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueAdd', 'storeOperand1'],
          },
          [ActionTypes.MEMORY_SUBSTRACT]: {
            cond: 'hasMemoryValue',
            actions: ['memoryValueSubtract', 'storeOperand1'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            target: 'operand1',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.CLEAR_EVERYTHING]: {
            target: 'operand1',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.POWER_OFF]: {
            target: 'off',
            actions: ['powerOff'],
          },
        },
      },
      alert: {
        invoke: {
          src: (_context: CalculatorContext, _event: any) => () => {
            alert('Cannot divide by zero!');
            return Promise.resolve();
          },
          onDone: {
            target: 'operand1',
            actions: ['reset'],
          },
        },
      },
      alertOff: {
        invoke: {
          src: (_context: CalculatorContext, _event: any) => () => {
            alert('Turn on by pressing AC first');
            return Promise.resolve();
          },
          onDone: {
            target: 'off',
            actions: ['reset'],
          },
        },
      },
    },
  },
  {
    guards: { notDivideByZero, hasMemoryValue },
    actions: {
      turnCalculatorOn,
      setDefaultDisplay,
      setKeyAsDisplay,
      toggleSign,
      setDecimalPoint,
      setOperator,
      storeOperand1,
      storeOperand2,
      compute,
      computePercentage,
      computeSqrt,
      memoryValueStore,
      memoryValueClear,
      memoryValueAdd,
      memoryValueSubtract,
      reset,
      powerOff,
    },
  }
);

export default calculatorMachine;
