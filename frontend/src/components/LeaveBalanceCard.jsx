import styles from "./LeaveBalanceCard.module.css";
const LeaveBalanceCard = ({ balance }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>Leave Balance</h2>
      <p className={styles.p}>Annual Leave: {balance.annual}</p>
      <p className={styles.p}>Sick Leave: {balance.sick}</p>
    </div>
  );
};

export default LeaveBalanceCard;
