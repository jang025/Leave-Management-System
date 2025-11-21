import { useNavigate } from "react-router";
import { useEffect } from "react";
import LeaveBalanceCard from "../components/LeaveBalanceCard";

const EmployeeDashboardPage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/signin");
  //   }
  //   //! fetch all leaves
  // }, [navigate]);

  //! cancel pending leave
  const handleCancel = () => {};
  //! delete approved leave
  const handleDelete = () => {};
  //! link to create leave page
  const handleCreate = () => {};
  //! sign out user
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>

      <LeaveBalanceCard />

      <h2>Your Leave Requests</h2>
      <ul>
        <li>
          Annual Leave — Pending <button onClick={handleCancel}>Cancel</button>
        </li>
        <li>
          Sick Leave — Approved <button onClick={handleDelete}>Delete</button>
        </li>
        <li>Sick Leave — Rejected</li>
      </ul>

      <button onClick={handleCreate}>Create New Leave Request</button>
      <button onClick={handleSignOut}>Signout</button>
    </div>
  );
};

export default EmployeeDashboardPage;
