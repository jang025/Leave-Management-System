const LeaveBalanceCard = ({ balance }) => {
  return (
    <div>
      <h2>Leave Balance</h2>
      <p>Annual Leave: {balance.annual}</p>
      <p>Sick Leave: {balance.sick}</p>
    </div>
  );
};

export default LeaveBalanceCard;
