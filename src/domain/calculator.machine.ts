/* eslint-disable @typescript-eslint/naming-convention */
import { assign, createMachine } from 'xstate';

import {
  setDecimalPoint,
  setDefaultDisplay,
  setKeyAsDisplay,
  setOperator,
  toggleSign,
  turnCalculatorOn,
} from './calculator.actions';
import { ActionTypes, OperationTypes } from './calculator.constants';
import { isMinus, isNotMinus, isNotZero, isZero, notDivideByZero } from './calculator.guards';
import { CalculatorContext, Operands } from './calcutator.dto';

function doMath(operand1: string, operand2: string, operator: Operands) {
  switch (operator) {
    case OperationTypes.ADDITION:
      return +operand1 + +operand2;
    case OperationTypes.SUBTRACTION:
      return +operand1 - +operand2;
    case OperationTypes.DIVISION:
      return +operand1 / +operand2;
    case OperationTypes.MULTIPLICATION:
      return +operand1 * +operand2;
    default:
      return Infinity;
  }
}

const defaultContext: CalculatorContext = {
  isPowered: false,
  isNegated: false,
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
              target: 'start',
              actions: ['turnCalculatorOn'],
            },
          ],
          '*': 'alertOff',
        },
      },
      start: {
        on: {
          [ActionTypes.DIGIT_PRESSED]: {
            actions: ['setKeyAsDisplay'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            actions: ['setDecimalPoint'],
          },
        },
      },
      operand1: {
        on: {
          [ActionTypes.OPERATOR]: {
            target: 'operator_entered',
            actions: ['recordOperator'],
          },
          [ActionTypes.PERCENTAGE]: {
            target: 'result',
            actions: ['storeResultAsOperand2', 'computePercentage'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            target: 'operand1',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            actions: ['setDecimalPoint'],
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
          [ActionTypes.DIGIT_PRESSED]: {
            target: 'operand2',
            actions: ['setKeyAsDisplay', 'saveOperand2'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            target: 'operand2',
            actions: ['setDecimalPoint', 'saveOperand2'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
        },
      },
      operand2: {
        on: {
          [ActionTypes.OPERATOR]: [
            {
              cond: 'notDivideByZero',
              target: 'operator_entered',
              actions: ['storeResultAsOperand2', 'compute', 'storeResultAsOperand1', 'setOperator'],
            },
            {
              target: 'alert',
            },
          ],
          [ActionTypes.EQUALS]: [
            {
              cond: 'notDivideByZero',
              target: 'result',
              actions: ['storeResultAsOperand2', 'compute'],
            },
            {
              target: 'alert',
            },
          ],
          [ActionTypes.CLEAR_ENTRY]: {
            target: 'operand2',
            actions: ['setDefaultDisplay'],
          },
          [ActionTypes.NEGATE]: {
            actions: ['toggleSign'],
          },
          [ActionTypes.DECIMAL_POINT]: {
            actions: ['setDecimalPoint'],
          },
        },
      },
      result: {
        on: {
          [ActionTypes.DIGIT_PRESSED]: {
            target: 'operand1',
            actions: ['setKeyAsDisplay'],
          },
          [ActionTypes.PERCENTAGE]: {
            target: 'result',
            actions: ['storeResultAsOperand2', 'computePercentage'],
          },
          [ActionTypes.OPERATOR]: {
            target: 'operator_entered',
            actions: ['storeResultAsOperand1', 'recordOperator'],
          },
          [ActionTypes.CLEAR_ENTRY]: {
            target: 'start',
            actions: ['setDefaultDisplay'],
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
            target: 'start',
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
          },
        },
      },
    },
  },
  {
    guards: {
      isMinus,
      isNotMinus,
      isZero,
      isNotZero,
      notDivideByZero,
    },
    actions: {
      turnCalculatorOn,
      setDefaultDisplay,
      setKeyAsDisplay,
      toggleSign,
      setDecimalPoint,
      setOperator,
      recordOperator: assign({
        operand1: (context) => context.display,
        operator: (_context, event) => event.operator,
      }),

      computePercentage: assign({
        display: (context, _event) => (+context.display / 100).toString(),
      }),

      compute: assign({
        display: (context, _event) => {
          const result = doMath(context.operand1!, context.operand2!, context.operator!);

          // eslint-disable-next-line no-console
          console.log(`doing calculation ${context.operand1} ${context.operator} ${context.operand2} = ${result}`);

          return result.toString();
        },
      }),

      storeResultAsOperand1: assign({
        operand1: (context) => context.display,
      }),

      storeResultAsOperand2: assign({
        operand2: (context) => context.display,
      }),

      saveOperand2: assign({
        operand2: (context, _event) => context.display,
      }),

      reset: assign<CalculatorContext>({
        display: () => '0',
        operand1: (_context, _event) => undefined,
        operand2: () => undefined,
        operator: () => undefined,
      }),
    },
  }
);

export default calculatorMachine;
