import { OperationTypes } from './constants';

export const getDigitValueFromOperationType = (operation: OperationTypes) => {
  switch (operation) {
    case OperationTypes.DIGIT_0: {
      return 0;
    }
    case OperationTypes.DIGIT_1: {
      return 1;
    }
    case OperationTypes.DIGIT_2: {
      return 2;
    }
    case OperationTypes.DIGIT_3: {
      return 3;
    }
    case OperationTypes.DIGIT_4: {
      return 4;
    }
    case OperationTypes.DIGIT_5: {
      return 5;
    }
    case OperationTypes.DIGIT_6: {
      return 6;
    }
    case OperationTypes.DIGIT_7: {
      return 7;
    }
    case OperationTypes.DIGIT_8: {
      return 8;
    }
    case OperationTypes.DIGIT_9: {
      return 9;
    }

    default: {
      return 0;
    }
  }
};
