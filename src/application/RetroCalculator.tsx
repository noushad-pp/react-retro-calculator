import { useMachine } from '@xstate/react';
import React from 'react';

import ButtonPanel from '../application/components/ButtonPanel';
import CalculatorDisplay from '../application/components/CalculatorDisplay';
import { OperationTypes } from '../domain/calculator.constants';
import calculatorMachine from '../domain/calculator.machine';
import { getActionFromOperationType } from '../domain/calculator.utils';

import styles from './RetroCalculator.module.scss';

const RetroCalculatorComp: React.FC = () => {
  const [{ context }, sendEvent] = useMachine(calculatorMachine, { devTools: true });
  const onButtonPressed = (operationType: OperationTypes) => {
    const action = getActionFromOperationType(operationType);
    sendEvent(action.type, action.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.shadows}>
          <div className={styles.leftBorderLine}>&nbsp;</div>
          <div className={styles.topBorderLine}>&nbsp;</div>
          <div className={styles.rightBorderLine}>&nbsp;</div>
          <div className={styles.bottomBorderLine}>&nbsp;</div>
        </div>
        <div className={styles.solarContainer}>
          <div className={styles.brandName}>CASIO</div>
          <div className={styles.solarPanelContainer}>
            <div className={styles.solarPanel}>&nbsp;</div>
            <div className={styles.text}>TWO WAY POWER</div>
          </div>
        </div>
        <div className={styles.displayContainer}>
          <CalculatorDisplay display={context.display} isPowered={!!context.isPowered} />
        </div>
        <div className={styles.buttonPanelContainer}>
          <ButtonPanel onButtonPressed={onButtonPressed} />
        </div>
      </div>
    </div>
  );
};

export const RetroCalculator = React.memo(RetroCalculatorComp);
export default RetroCalculator;
