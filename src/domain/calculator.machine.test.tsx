import { cleanup, fireEvent, render } from '@testing-library/react';
import { useMachine } from '@xstate/react';
import { createModel } from '@xstate/test';
import React from 'react';
import { createMachine } from 'xstate';

import { ActionTypes, OperationTypes } from './calculator.constants';
import { CalculatorContext } from './calculator.dto';
import { calculatorMachine, calculatorMachineConfig } from './calculator.machine';
import { getActionFromOperationType } from './calculator.utils';

const turnCalculatorOn = jest.fn();
const setDefaultDisplay = jest.fn();

const TestComponent = () => {
  const [state, publish] = useMachine(calculatorMachine, {
    actions: {
      turnCalculatorOn,
      setDefaultDisplay,
    },
  });

  return (
    <div>
      <p data-testid="current_state">{state.value as string}</p>
      {Object.values(OperationTypes).map((operationType) => {
        const onClick = () => {
          const action = getActionFromOperationType(operationType);
          publish(action.type, action.value);
        };

        return (
          <button key={operationType} onClick={onClick} id={operationType}>
            {operationType}
          </button>
        );
      })}
    </div>
  );
};

// // @ts-ignore
// calculatorMachineConfig.states.off.meta = {
//   test: async ({ getByTestId }: { getByTestId: (v: string) => void}) => {
//     expect(getByTestId('current_state')).toHaveTextContent('off');
//   },
// };
//
// // @ts-ignore
// calculatorMachineConfig.states.operand1.meta = {
//   test: async ({ getByTestId }: { getByTestId: (v: string) => void}) => {
//     expect(getByTestId('current_state')).toHaveTextContent('operand1');
//   },
// };

const guards = {
  notDivideByZero: () => false,
  hasMemoryValue: () => false,
};

const calculatorMachineModel = createModel(
  createMachine<CalculatorContext>(calculatorMachineConfig, { guards })
).withEvents({
  [ActionTypes.CLEAR_EVERYTHING]: {
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.CLEAR_ENTRY]: {
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(setDefaultDisplay).toHaveBeenCalled();
    },
  },
  [ActionTypes.DIGIT]: {
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.DECIMAL_POINT]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.MEMORY_ADD]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.MEMORY_SUBSTRACT]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.MEMORY_CLEAR]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.MEMORY_RECORD]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.OPERATOR]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.SQUARE_ROOT]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.PERCENTAGE]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.NEGATE]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
  [ActionTypes.EQUALS]: {
    // @ts-ignore
    exec: ({ getByText }) => {
      fireEvent.click(getByText(OperationTypes.ALL_CLEAR));
      expect(turnCalculatorOn).toHaveBeenCalled();
    },
  },
});

describe('StateMachine', () => {
  const testPlans = calculatorMachineModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    console.log({ plan });
    // eslint-disable-next-line jest/valid-title
    describe(plan.description, () => {
      afterEach(cleanup);
      plan.paths.forEach((path) => {
        // eslint-disable-next-line jest/valid-title
        it(path.description, async () => {
          await path.test(render(<TestComponent />));
        });
      });
    });
  });
});
