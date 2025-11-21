import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LeaveBalanceCard from "../components/LeaveBalanceCard";
import { show } from "../services/employeeService";

const EmployeeDashboardPage = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    //   //! fetch all leaves
    const fetchLeaves = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const data = await show(token);
        console.log(data);
        setLeaves(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaves();
  }, [navigate]);

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
      {leaves.length === 0 ? (
        <p>No leave requests yet.</p>
      ) : (
        <ul>
          {leaves.map((leave) => (
            <li key={leave.id}>
              {leave.leave_type} : {leave.reason} — {leave.status}
              {leave.status === "pending" && (
                <button onClick={() => handleCancel(leave.id)}>Cancel</button>
              )}
              {leave.status === "approved" && (
                <button onClick={() => handleDelete(leave.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleCreate}>Create New Leave Request</button>
      <button onClick={handleSignOut}>Signout</button>
    </div>
  );
};

export default EmployeeDashboardPage;
