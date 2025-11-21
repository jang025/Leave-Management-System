import { useNavigate } from "react-router";
import LeaveDetailsCard from "../components/LeaveDetailsCard";

const LeaveDetailsPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  return (
    <div>
      <h1>Leave Details</h1>
      <LeaveDetailsCard />
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default LeaveDetailsPage;
