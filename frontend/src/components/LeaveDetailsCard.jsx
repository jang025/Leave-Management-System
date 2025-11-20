const LeaveDetailsCard = () => {
  //! approve pending leave - take note when a pending leave is approved , need to decrement leave balance by one
  const handleApprove = () => {};
  //! reject pending leave
  const handleReject = () => {};
  return (
    <div>
      <p>
        <strong>Employee:</strong> John Doe
      </p>
      <p>
        <strong>Leave Type:</strong> Annual Leave
      </p>
      <p>
        <strong>Dates:</strong> Feb 10 - Feb 12
      </p>
      <p>
        <strong>Reason:</strong> Family Trip
      </p>

      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default LeaveDetailsCard;
