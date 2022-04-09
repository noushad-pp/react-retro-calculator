import React from 'react';

import styles from './CalculatorDisplay.module.scss';

const CalculatorDisplayComp: React.FC = () => {
  const hasMemory = false;
  const hasPower = true;
  const displayText = 0;

  return (
    <div className={styles.displayContainer}>
      <div className={styles.memory}>{hasMemory && <span>M</span>}</div>
      <div className={styles.display}>
        {hasPower && <div className={styles.displayRow}>{displayText}</div>}
        {!hasPower && <div className={styles.displayRow}>&nbsp;</div>}
      </div>
    </div>
  );
};

export const CalculatorDisplay = React.memo(CalculatorDisplayComp);
export default CalculatorDisplay;
