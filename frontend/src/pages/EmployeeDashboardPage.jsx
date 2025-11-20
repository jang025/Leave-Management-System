import LeaveBalanceCard from "../components/LeaveBalanceCard";

const EmployeeDashboardPage = () => {
  return (
    <div>
      <h1>Employee Dashboard</h1>

      <LeaveBalanceCard />

      <h2>Your Leave Requests</h2>
      <ul>
        <li>
          Annual Leave — Pending <button>Cancel</button>
        </li>
        <li>
          Sick Leave — Approved <button>Delete</button>
        </li>
        <li>Sick Leave — Rejected</li>
      </ul>

      <button>Create New Leave Request</button>
      <button>Signout</button>
    </div>
  );
};

export default EmployeeDashboardPage;
