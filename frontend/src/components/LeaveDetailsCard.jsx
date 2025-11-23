import dayjs from "dayjs";
import styles from "./LeaveDetailsCard.module.css";

const LeaveDetailsCard = ({ handleApprove, handleReject, leave }) => {
  return (
    <div className={styles.card}>
      <p className={styles.p}>
        <strong>Employee:</strong> {leave.username}
      </p>
      <p>
        <strong>Leave Type:</strong> {leave.leave_type}
      </p>
      <p>
        <strong>Dates:</strong> {dayjs(leave.start_date).format("DD MMM YYYY")}{" "}
        - {dayjs(leave.end_date).format("DD MMM YYYY")}
      </p>
      <p>
        <strong>Reason:</strong> {leave.reason}
      </p>

      <button onClick={handleApprove} className={styles.button}>
        Approve
      </button>
      <button onClick={handleReject} className={styles.button}>
        Reject
      </button>
    </div>
  );
};

export default LeaveDetailsCard;
