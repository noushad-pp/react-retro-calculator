import className from 'classnames';
import { OperationTypes } from 'domain/calculator.constants';
import React from 'react';

import styles from './Button.module.scss';

type Props = {
  operation: OperationTypes;
  onClick: (operation: OperationTypes) => void;
  type?: 'normal' | 'small' | 'red' | 'tall';
  withAddon?: boolean;
};

const ButtonComp: React.FC<Props> = ({ operation, onClick, type, withAddon }) => {
  const onButtonClick = () => onClick(operation);
  const isRed = type === 'red';
  const isTall = type === 'tall';
  const isSmall = type === 'small';

  return (
    <div
      className={className(styles.container, {
        [styles.red]: isRed,
        [styles.tall]: isTall,
        [styles.small]: isSmall,
        [styles.withAddon]: withAddon,
      })}
    >
      <button onClick={onButtonClick}>{operation}</button>
    </div>
  );
};

export const Button = React.memo(ButtonComp);
export default Button;
