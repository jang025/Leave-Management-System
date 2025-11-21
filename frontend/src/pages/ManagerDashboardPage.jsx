import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { show } from "../services/managerService";
import dayjs from "dayjs";

const ManagerDashboardPage = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    //   //! fetch all pending leaves
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

  //! sign out user
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <h2>Pending Leave Requests</h2>
      //! Nav link for each pending leave request to leave details page
      {leaves.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <ul>
          {leaves.map((leave) => (
            <li key={leave.id}>
              <NavLink to={`/manager/${leave.id}/details`}>
                {leave.username} — {leave.leave_type} leave —{" "}
                {dayjs(leave.start_date).format("DD MMM YYYY")} to{" "}
                {dayjs(leave.end_date).format("DD MMM YYYY")}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default ManagerDashboardPage;
