import React from 'react';

import { OperationTypes } from '../../domain/constants';

import Button from './Button';

import styles from './ButtonPanel.module.scss';

type Props = {
  handleClick: () => void;
};
const ButtonPanelComp: React.FC<Props> = ({ handleClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonTopRow}>
        <span className={styles.modelText}>SL-3005V</span>
        <div className={styles.powerRow}>
          <Button onClick={handleClick} name="&radic;" operation={OperationTypes.SQUARE_ROOT} type="small" />
          <Button onClick={handleClick} name="OFF" operation={OperationTypes.POWER_OFF} type="small" />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={handleClick} name="MC" operation={OperationTypes.MEM_CLEAR} />
        <Button onClick={handleClick} name="MR" operation={OperationTypes.MEM_RECORD} />
        <Button onClick={handleClick} name="M+" operation={OperationTypes.MEM_ADD} />
        <Button onClick={handleClick} name="M-" operation={OperationTypes.MEM_SUBTRACT} />
        <Button onClick={handleClick} name="&divide;" operation={OperationTypes.DIVISION} />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={handleClick} name="%" operation={OperationTypes.MODULUS} />
        <Button onClick={handleClick} name={7} operation={OperationTypes.DIGIT} />
        <Button onClick={handleClick} name={8} operation={OperationTypes.DIGIT} />
        <Button onClick={handleClick} name={9} operation={OperationTypes.DIGIT} />
        <Button onClick={handleClick} name="&#10005;" operation={OperationTypes.MULTIPLICATION} />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={handleClick} name="+/-" operation={OperationTypes.SIGN_CHANGE} />
        <Button onClick={handleClick} name={4} operation={OperationTypes.DIGIT} />
        <Button onClick={handleClick} name={5} operation={OperationTypes.DIGIT} />
        <Button onClick={handleClick} name={6} operation={OperationTypes.DIGIT} />
        <Button onClick={handleClick} name="&minus;" operation={OperationTypes.SUBTRACTION} />
      </div>
      <div className={styles.buttonRow}>
        <div className="flex-column">
          <div className={styles.buttonRow}>
            <Button onClick={handleClick} name="C" type="red" operation={OperationTypes.CLEAR} />
            <Button onClick={handleClick} name={1} operation={OperationTypes.DIGIT} />
            <Button onClick={handleClick} name={2} operation={OperationTypes.DIGIT} />
            <Button onClick={handleClick} name={3} operation={OperationTypes.DIGIT} />
          </div>
          <div className={styles.buttonRow}>
            <div className={styles.buttonRowBottom}>
              <Button onClick={handleClick} name="AC" type="red" operation={OperationTypes.ALL_CLEAR} withAddon />
              <span className={styles.onText}>ON</span>
            </div>
            <Button onClick={handleClick} name={0} operation={OperationTypes.DIGIT} />
            <Button onClick={handleClick} name="." operation={OperationTypes.FLOAT} />
            <Button onClick={handleClick} name="=" operation={OperationTypes.COMPUTE} />
          </div>
        </div>
        <Button onClick={handleClick} name="+" type="tall" operation={OperationTypes.ADDITION} />
      </div>
    </div>
  );
};

export const ButtonPanel = React.memo(ButtonPanelComp);
export default ButtonPanel;
