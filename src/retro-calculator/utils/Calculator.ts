import { getDigitValueFromOperationType } from './calculator.utils';
import { OperationTypes } from './constants';

export class Calculator {
  private hasPower = false;
  private hasMemory = false;
  private hasSignNegated = false;
  private displayText = 0;
  private currentOperand: number[] = [];
  private previousOperand: number[] = [];
  private operation: OperationTypes = OperationTypes.NO_OP;
  private error = '';

  get isPoweredOn() {
    return this.hasPower;
  }
  get isMemoryOn() {
    return this.hasMemory;
  }
  get isSignNegated() {
    return this.hasSignNegated;
  }
  get display() {
    return this.displayText;
  }

  buttonPress(operation: OperationTypes) {
    if (!this.hasPower) {
      if (operation === OperationTypes.ALL_CLEAR) {
        this.hasPower = true;
        this.displayText = 0;
      } else {
        this.error = 'Power on the calculator first';
      }
    } else {
      switch (operation) {
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
          this.currentOperand.push(getDigitValueFromOperationType(operation));
        }
      }
    }
  }
}
