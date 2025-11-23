import { useNavigate } from "react-router";
import CreateLeaveForm from "../components/CreateLeaveForm";
import { useState } from "react";
import { create } from "../services/employeeService";

const CreateLeavePage = () => {
  const token = localStorage.getItem("token");
  const employeeId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const [user, setUser] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  //! submit new leave request
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await create(user, token);
      console.log(result);
      navigate(`/employee/${employeeId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  return (
    <div>
      <h1>Create Leave Request</h1>
      <CreateLeaveForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        user={user}
      />
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default CreateLeavePage;
