import { useEffect } from "react";
import { useNavigate } from "react-router";

const ManagerDashboardPage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/signin");
  //   }
  //   //! fetch all pending leaves
  // }, [navigate]);

  //! sign out user
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>

      <h2>Pending Leave Requests</h2>
      <ul>
        //! Nav link for each pending leave request to leave details page
        <li>Adam — Annual Leave — 5 Feb to 10 Feb</li>
        <li>Brian — Sick Leave — 12 Feb to 13 Feb</li>
      </ul>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default ManagerDashboardPage;
