import React from 'react';

import { OperationTypes } from '../utils/constants';

import Button from './Button';

import styles from './ButtonPanel.module.scss';

const ButtonPanelComp: React.FC = () => {
  const buttonPress = (_operation: OperationTypes) => null;

  return (
    <div className={styles.container}>
      <div className={styles.buttonTopRow}>
        <span className={styles.modelText}>SL-3005V</span>
        <div className={styles.powerRow}>
          <Button onClick={buttonPress} name="&radic;" operation={OperationTypes.SQUARE_ROOT} type="small" />
          <Button onClick={buttonPress} name="OFF" operation={OperationTypes.POWER_OFF} type="small" />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={buttonPress} name="MC" operation={OperationTypes.MEM_CLEAR} />
        <Button onClick={buttonPress} name="MR" operation={OperationTypes.MEM_RECORD} />
        <Button onClick={buttonPress} name="M+" operation={OperationTypes.MEM_ADD} />
        <Button onClick={buttonPress} name="M-" operation={OperationTypes.MEM_SUBTRACT} />
        <Button onClick={buttonPress} name="&divide;" operation={OperationTypes.DIVISION} />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={buttonPress} name="%" operation={OperationTypes.MODULUS} />
        <Button onClick={buttonPress} name={7} operation={OperationTypes.DIGIT_7} />
        <Button onClick={buttonPress} name={8} operation={OperationTypes.DIGIT_8} />
        <Button onClick={buttonPress} name={9} operation={OperationTypes.DIGIT_9} />
        <Button onClick={buttonPress} name="&#10005;" operation={OperationTypes.MULTIPLICATION} />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={buttonPress} name="+/-" operation={OperationTypes.SIGN_CHANGE} />
        <Button onClick={buttonPress} name={4} operation={OperationTypes.DIGIT_4} />
        <Button onClick={buttonPress} name={5} operation={OperationTypes.DIGIT_5} />
        <Button onClick={buttonPress} name={6} operation={OperationTypes.DIGIT_6} />
        <Button onClick={buttonPress} name="&minus;" operation={OperationTypes.SUBTRACTION} />
      </div>
      <div className={styles.buttonRow}>
        <div className="flex-column">
          <div className={styles.buttonRow}>
            <Button onClick={buttonPress} name="C" type="red" operation={OperationTypes.CLEAR} />
            <Button onClick={buttonPress} name={1} operation={OperationTypes.DIGIT_1} />
            <Button onClick={buttonPress} name={2} operation={OperationTypes.DIGIT_2} />
            <Button onClick={buttonPress} name={3} operation={OperationTypes.DIGIT_3} />
          </div>
          <div className={styles.buttonRow}>
            <div className={styles.buttonRowBottom}>
              <Button onClick={buttonPress} name="AC" type="red" operation={OperationTypes.ALL_CLEAR} withAddon />
              <span className={styles.onText}>ON</span>
            </div>
            <Button onClick={buttonPress} name={0} operation={OperationTypes.DIGIT_0} />
            <Button onClick={buttonPress} name="." operation={OperationTypes.FLOAT} />
            <Button onClick={buttonPress} name="=" operation={OperationTypes.COMPUTE} />
          </div>
        </div>
        <Button onClick={buttonPress} name="+" type="tall" operation={OperationTypes.ADDITION} />
      </div>
    </div>
  );
};

export const ButtonPanel = React.memo(ButtonPanelComp);
export default ButtonPanel;
