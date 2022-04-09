import React from 'react';

import ButtonPanel from './components/ButtonPanel';
import CalculatorDisplay from './components/CalculatorDisplay';

import styles from './RetroCalculator.module.scss';

const RetroCalculatorComp: React.FC = () => {
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
          <CalculatorDisplay />
        </div>
        <div className={styles.buttonPanelContainer}>
          <ButtonPanel />
        </div>
      </div>
    </div>
  );
};

export const RetroCalculator = React.memo(RetroCalculatorComp);
export default RetroCalculator;
