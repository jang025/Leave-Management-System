import { useNavigate } from "react-router";
import CreateLeaveForm from "../components/CreateLeaveForm";

const CreateLeavePage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  return (
    <div>
      <h1>Create Leave Request</h1>
      <CreateLeaveForm />
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default CreateLeavePage;
