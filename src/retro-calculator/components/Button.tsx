import className from 'classnames';
import React from 'react';

import { OperationTypes } from '../utils/constants';

import styles from './Button.module.scss';

type Props = {
  name: string | number;
  operation: OperationTypes;
  onClick: (operation: OperationTypes) => void;
  type?: 'normal' | 'small' | 'red' | 'tall';
  withAddon?: boolean;
};

const ButtonComp: React.FC<Props> = ({ name, operation, onClick, type, withAddon }) => {
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
      <button onClick={onButtonClick}>{name}</button>
    </div>
  );
};

export const Button = React.memo(ButtonComp);
export default Button;
