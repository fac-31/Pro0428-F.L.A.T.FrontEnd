import React from 'react';
import classNames from 'classnames';
import styles from '../../styles/dashboard.module.css';

interface FridgeTopDoorProps {
  onSectionClick: (section: 'cleaning' | 'bills' | 'review') => void;
}

const FridgeTop: React.FC<FridgeTopDoorProps> = ({ onSectionClick }) => {
  return (
    <div className={styles.fridge_top}>
      <div className={styles.border_top}></div>
      <h1 className={styles.fridge_title}>FLAT</h1>
      <div className={classNames(styles.door_handle, styles.top)}></div>
      <div className={styles.button_container}>
        {['cleaning', 'bills', 'review'].map((section) => (
          <button
            key={section}
            onClick={() => onSectionClick(section as 'cleaning' | 'bills' | 'review')}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>
      <div className={styles.border_bottom}></div>
    </div>
  );
};

export default FridgeTop;
