import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LeaveBalanceCard from "../components/LeaveBalanceCard";
import {
  getLeaveBalance,
  remove,
  show,
  update,
} from "../services/employeeService";
import styles from "./Layout.module.css";
import dayjs from "dayjs";

const EmployeeDashboardPage = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [balance, setBalance] = useState({ annual: 0, sick: 0 });
  const token = localStorage.getItem("token");
  const employeeId = localStorage.getItem("userId");
  useEffect(() => {
    //   //! fetch all leaves
    const fetchData = async () => {
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const leaveData = await show(token);
        setLeaves(leaveData);

        const balanceData = await getLeaveBalance(token);
        setBalance({
          annual: balanceData.annual_remaining,
          sick: balanceData.sick_remaining,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [navigate, token]);

  //! cancel pending leave
  const handleCancel = async (leaveId) => {
    try {
      const updatedLeave = await update(leaveId, token);
      setLeaves((prevLeaves) =>
        prevLeaves.filter((leave) => leave.id !== updatedLeave.leave.id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  //! delete approved leave
  const handleDelete = async (leaveId) => {
    try {
      const deletedLeave = await remove(leaveId, token);
      setLeaves((prevLeaves) =>
        prevLeaves.filter((leave) => leave.id !== leaveId)
      );
      console.log(deletedLeave);
      const balanceData = await getLeaveBalance(token);
      setBalance({
        annual: balanceData.annual_remaining,
        sick: balanceData.sick_remaining,
      });
    } catch (error) {
      console.error(error);
    }
  };
  //! link to create leave page
  const handleCreate = () => {
    navigate(`/employee/${employeeId}/new`);
  };

  //! sign out user
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Employee Dashboard</h1>

      <LeaveBalanceCard balance={balance} />

      <h2>Your Leave Requests</h2>
      {leaves.length === 0 ? (
        <p>No leave requests yet.</p>
      ) : (
        <ul>
          {leaves.map((leave) => (
            <li key={leave.id}>
              {leave.leave_type} : {leave.reason} — {leave.status}{" "}
              {dayjs(leave.start_date).format("DD MMM YYYY")} to{" "}
              {dayjs(leave.end_date).format("DD MMM YYYY")}{" "}
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
