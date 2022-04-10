import { assign } from 'xstate';

import { CalculatorContext } from './calcutator.dto';

const defaultDisplay = () => '0';

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

    return `${context.display}${event.key}`;
  },
});

export const toggleSign = assign<CalculatorContext>({
  isNegated: (context: CalculatorContext) => !context.isNegated,
});

export const setOperator = assign<CalculatorContext>({
  operator: (context, _event) => context.operator,
});

export const setDecimalPoint = assign<CalculatorContext>({
  display: (context, _event) => (context.display.includes('.') ? context.display : `${context.display}.`),
});
