import { Route, Routes } from "react-router";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import CreateLeavePage from "./pages/CreateLeavePage";
import LeaveDetailsPage from "./pages/LeaveDetailsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/employee/:id" element={<EmployeeDashboardPage />} />
        <Route path="/employee/:id/new" element={<CreateLeavePage />} />
        <Route path="/manager/:id" element={<ManagerDashboardPage />} />
        <Route path="/manager/:id/:leaveId" element={<LeaveDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
