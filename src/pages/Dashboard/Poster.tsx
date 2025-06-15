import classNames from 'classnames';
import styles from '../../styles/dashboard.module.css';

const Poster = () => {
  return (
    <div className={styles.poster}>
      <div className={classNames(styles.pin, styles.top_left)}></div>
      <div className={classNames(styles.pin, styles.bottom_left)}></div>
      <div className={classNames(styles.pin, styles.bottom_right)}></div>
      <div className={styles.text_container}>
        <h1 className={styles.poster_title}>HOUSE VIBES</h1>
        <p className={styles.house_vibes_paragraph}>This is how we want our house to operate:</p>
      </div>
    </div>
  );
};

export default Poster;
