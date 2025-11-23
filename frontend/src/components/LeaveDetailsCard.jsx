import dayjs from "dayjs";

const LeaveDetailsCard = ({ handleApprove, handleReject, leave }) => {
  return (
    <div>
      <p>
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

      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default LeaveDetailsCard;
