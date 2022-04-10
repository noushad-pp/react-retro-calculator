/* eslint-disable @typescript-eslint/naming-convention */
import { createMachine } from 'xstate';

import {
  compute,
  computePercentage,
  operatorEntered,
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
import { notDivideByZero } from './calculator.guards';
import { CalculatorContext } from './calcutator.dto';

const defaultContext: CalculatorContext = {
  isPowered: false,
  display: '0',
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
            actions: ['setKeyAsDisplay'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            actions: ['setDecimalPoint'],
          },
          [ActionTypes.OPERATOR]: {
            target: 'operator_entered',
            actions: ['operatorEntered'],
          },
          [ActionTypes.PERCENTAGE]: {
            target: 'operand1',
            actions: ['computePercentage', 'storeOperand1'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            actions: ['setDefaultDisplay'],
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
            actions: ['setDefaultDisplay', 'setKeyAsDisplay'],
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
            actions: ['setKeyAsDisplay'],
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
            actions: ['storeOperand2', 'computePercentage'],
          },
          [ActionTypes.OPERATOR]: {
            target: 'operator_entered',
            actions: ['storeOperand1', 'setOperator'],
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
    guards: {
      notDivideByZero,
    },
    actions: {
      turnCalculatorOn,
      setDefaultDisplay,
      setKeyAsDisplay,
      toggleSign,
      setDecimalPoint,
      setOperator,
      operatorEntered,
      storeOperand1,
      storeOperand2,
      compute,
      computePercentage,
      reset,
      powerOff,
    },
  }
);

export default calculatorMachine;
