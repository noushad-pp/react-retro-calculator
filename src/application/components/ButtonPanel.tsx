import React from 'react';

import { OperationTypes } from '../../domain/calculator.constants';

import Button from './Button';

import styles from './ButtonPanel.module.scss';

type Props = {
  onButtonPressed: (btn: OperationTypes) => void;
};
const ButtonPanelComp: React.FC<Props> = ({ onButtonPressed }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonTopRow}>
        <span className={styles.modelText}>SL-3005V</span>
        <div className={styles.powerRow}>
          <Button onClick={onButtonPressed} operation={OperationTypes.SQUARE_ROOT} type="small" />
          <Button onClick={onButtonPressed} operation={OperationTypes.POWER_OFF} type="small" />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={onButtonPressed} operation={OperationTypes.MEM_CLEAR} />
        <Button onClick={onButtonPressed} operation={OperationTypes.MEM_RECORD} />
        <Button onClick={onButtonPressed} operation={OperationTypes.MEM_ADD} />
        <Button onClick={onButtonPressed} operation={OperationTypes.MEM_SUBTRACT} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIVISION} />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={onButtonPressed} operation={OperationTypes.MODULUS} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_7} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_8} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_9} />
        <Button onClick={onButtonPressed} operation={OperationTypes.MULTIPLICATION} />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={onButtonPressed} operation={OperationTypes.SIGN_CHANGE} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_4} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_5} />
        <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_6} />
        <Button onClick={onButtonPressed} operation={OperationTypes.SUBTRACTION} />
      </div>
      <div className={styles.buttonRow}>
        <div className="flex-column">
          <div className={styles.buttonRow}>
            <Button onClick={onButtonPressed} type="red" operation={OperationTypes.CLEAR} />
            <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_1} />
            <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_2} />
            <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_3} />
          </div>
          <div className={styles.buttonRow}>
            <div className={styles.buttonRowBottom}>
              <Button onClick={onButtonPressed} type="red" operation={OperationTypes.ALL_CLEAR} withAddon />
              <span className={styles.onText}>ON</span>
            </div>
            <Button onClick={onButtonPressed} operation={OperationTypes.DIGIT_0} />
            <Button onClick={onButtonPressed} operation={OperationTypes.FLOAT} />
            <Button onClick={onButtonPressed} operation={OperationTypes.COMPUTE} />
          </div>
        </div>
        <Button onClick={onButtonPressed} type="tall" operation={OperationTypes.ADDITION} />
      </div>
    </div>
  );
};

export const ButtonPanel = React.memo(ButtonPanelComp);
export default ButtonPanel;
