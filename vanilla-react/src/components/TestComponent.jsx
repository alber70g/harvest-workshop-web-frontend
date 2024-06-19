import styles from './style.module.css';

export const TestComponent = ({ label }) => {
  return <div className={styles.wrapper}>Hello, {label}!</div>;
};
