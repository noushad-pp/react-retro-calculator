import React from 'react';

import styles from './CalculatorDisplay.module.scss';

type Props = {
  isPoweredOn: boolean;
  displayValue: number;
  hasMemory: boolean;
};
const CalculatorDisplayComp: React.FC<Props> = ({ isPoweredOn, displayValue, hasMemory = 0 }) => {
  return (
    <div className={styles.displayContainer}>
      <div className={styles.memory}>{hasMemory && <span>M</span>}</div>
      <div className={styles.display}>
        {isPoweredOn && <div className={styles.displayRow}>{displayValue}</div>}
        {!isPoweredOn && <div className={styles.displayRow}>&nbsp;</div>}
      </div>
    </div>
  );
};

export const CalculatorDisplay = React.memo(CalculatorDisplayComp);
export default CalculatorDisplay;
