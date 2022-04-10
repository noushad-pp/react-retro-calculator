import React from 'react';

import styles from './CalculatorDisplay.module.scss';

type Props = {
  isPowered: boolean;
  isNegated: boolean;
  display: string;
};
const CalculatorDisplayComp: React.FC<Props> = ({ display, isPowered, isNegated }) => {
  const hasMemory = false;

  return (
    <div className={styles.displayContainer}>
      <div className={styles.memory}>{hasMemory && <span>M</span>}</div>
      <div className={styles.display}>
        {isPowered && (
          <div className={styles.displayRow}>
            {isNegated && <span>-</span>}
            {display}
          </div>
        )}
        {!isPowered && <div className={styles.displayRow}>&nbsp;</div>}
      </div>
    </div>
  );
};

export const CalculatorDisplay = React.memo(CalculatorDisplayComp);
export default CalculatorDisplay;
