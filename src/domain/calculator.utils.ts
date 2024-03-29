import { ActionTypes, OperationTypes } from './calculator.constants';
import { CalculatorEvent } from './calculator.dto';

export const getActionFromOperationType = (operationType: OperationTypes): CalculatorEvent => {
  switch (operationType) {
    case OperationTypes.DIGIT_0:
    case OperationTypes.DIGIT_1:
    case OperationTypes.DIGIT_2:
    case OperationTypes.DIGIT_3:
    case OperationTypes.DIGIT_4:
    case OperationTypes.DIGIT_5:
    case OperationTypes.DIGIT_6:
    case OperationTypes.DIGIT_7:
    case OperationTypes.DIGIT_8:
    case OperationTypes.DIGIT_9: {
      return {
        type: ActionTypes.DIGIT,
        value: { key: parseInt(operationType) },
      };
    }

    case OperationTypes.ALL_CLEAR: {
      return {
        type: ActionTypes.CLEAR_EVERYTHING,
        value: {},
      };
    }

    case OperationTypes.CLEAR: {
      return {
        type: ActionTypes.CLEAR_ENTRY,
        value: {},
      };
    }

    case OperationTypes.ADDITION:
    case OperationTypes.SUBTRACTION:
    case OperationTypes.DIVISION:
    case OperationTypes.MULTIPLICATION: {
      return {
        type: ActionTypes.OPERATOR,
        value: {
          operator: operationType,
        },
      };
    }

    case OperationTypes.MODULUS: {
      return {
        type: ActionTypes.PERCENTAGE,
        value: {},
      };
    }

    case OperationTypes.SQUARE_ROOT: {
      return {
        type: ActionTypes.SQUARE_ROOT,
        value: {},
      };
    }

    case OperationTypes.SIGN_CHANGE: {
      return {
        type: ActionTypes.NEGATE,
        value: {},
      };
    }

    case OperationTypes.FLOAT: {
      return {
        type: ActionTypes.DECIMAL_POINT,
        value: {},
      };
    }

    case OperationTypes.COMPUTE: {
      return {
        type: ActionTypes.EQUALS,
        value: {},
      };
    }

    case OperationTypes.MEM_RECORD: {
      return {
        type: ActionTypes.MEMORY_RECORD,
        value: {},
      };
    }

    case OperationTypes.MEM_CLEAR: {
      return {
        type: ActionTypes.MEMORY_CLEAR,
        value: {},
      };
    }

    case OperationTypes.MEM_ADD: {
      return {
        type: ActionTypes.MEMORY_ADD,
        value: {},
      };
    }

    case OperationTypes.MEM_SUBTRACT: {
      return {
        type: ActionTypes.MEMORY_SUBSTRACT,
        value: {},
      };
    }

    case OperationTypes.POWER_OFF: {
      return {
        type: ActionTypes.POWER_OFF,
        value: {},
      };
    }

    default: {
      return {
        type: ActionTypes.CLEAR_EVERYTHING,
        value: {},
      };
    }
  }
};
