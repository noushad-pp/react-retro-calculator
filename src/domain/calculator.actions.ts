import { assign } from 'xstate';

import { OperationTypes } from './calculator.constants';
import { CalculatorContext, Operands } from './calculator.dto';

const defaultDisplay = () => '0';

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

const limitDisplayLength = (value: string) => value.slice(0, 8);

export const turnCalculatorOn = assign<CalculatorContext>({
  isPowered: () => true,
  display: defaultDisplay,
});

export const setDefaultDisplay = assign<CalculatorContext>({
  display: defaultDisplay,
});

export const setKeyAsDisplay = assign<CalculatorContext, any>({
  display: (context, event) => {
    // skip the first 0s entered
    if (context.display == defaultDisplay()) {
      return `${event.key}`;
    }

    // Display can only show 8 digits at a time
    return limitDisplayLength(`${context.display}${event.key}`);
  },
});

export const toggleSign = assign<CalculatorContext>({
  display: (context: CalculatorContext) => (parseInt(context.display) * -1).toString(),
});

export const setDecimalPoint = assign<CalculatorContext>({
  display: (context, _event) => (context.display.includes('.') ? context.display : `${context.display}.`),
});

export const setOperator = assign<CalculatorContext>({
  operator: (_context, event: any) => event.operator,
});

export const storeOperand1 = assign<CalculatorContext>({
  operand1: (context) => context.display,
  operand2: () => undefined,
});

export const storeOperand2 = assign<CalculatorContext>({
  operand2: (context) => context.display,
});

export const computePercentage = assign<CalculatorContext>({
  display: (context, _event) => limitDisplayLength((+context.display / 100).toString()),
});

export const computeSqrt = assign<CalculatorContext>({
  display: (context, _event) => {
    if (parseInt(context.display) <= 0) return defaultDisplay();

    return limitDisplayLength(Math.sqrt(parseInt(context.display)).toString());
  },
});

export const compute = assign<CalculatorContext>({
  display: (context, _event) => {
    const result = doMath(context.operand1!, context.operand2!, context.operator!);
    if (result.toString().split('.')[0].length > 8) {
      return limitDisplayLength(result.toExponential(2));
    }

    return limitDisplayLength(result.toString());
  },
});

export const memoryValueStore = assign<CalculatorContext>({
  memoryValue: (context) => context.display,
});

export const memoryValueClear = assign<CalculatorContext>({
  memoryValue: () => undefined,
});

export const memoryValueAdd = assign<CalculatorContext>({
  display: (context) => {
    const val = parseInt(context.display) + parseInt(context.memoryValue || '0');

    return limitDisplayLength(val.toString());
  },
});

export const memoryValueSubtract = assign<CalculatorContext>({
  display: (context) => {
    const val = parseInt(context.display) - parseInt(context.memoryValue! || '0');

    return limitDisplayLength(val.toString());
  },
});

export const reset = assign<CalculatorContext>({
  display: () => '0',
  operand1: () => undefined,
  operand2: () => undefined,
  operator: () => undefined,
});

export const powerOff = assign<CalculatorContext>({
  isPowered: () => false,
  display: () => '0',
  memoryValue: () => undefined,
  operand1: () => undefined,
  operand2: () => undefined,
  operator: () => undefined,
});
