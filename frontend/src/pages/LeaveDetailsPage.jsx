import { useNavigate, useParams } from "react-router";
import LeaveDetailsCard from "../components/LeaveDetailsCard";
import { useEffect, useState } from "react";
import { approve, reject, showOne } from "../services/managerService";

const LeaveDetailsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { leaveId } = useParams();
  const [leave, setLeave] = useState(null);
  useEffect(() => {
    //   //! fetch leave details
    const fetchData = async () => {
      try {
        const leaveData = await showOne(leaveId, token);
        setLeave(leaveData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [leaveId, token]);

  //! approve pending leave
  const handleApprove = async () => {
    try {
      const updatedLeave = await approve(leaveId, token);
      console.log(updatedLeave);
      handleGoBack();
    } catch (error) {
      console.error(error);
    }
  };
  //! reject pending leave
  const handleReject = async () => {
    try {
      const updatedLeave = await reject(leaveId, token);
      console.log(updatedLeave);
      handleGoBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  return (
    <div>
      <h1>Leave Details</h1>
      <LeaveDetailsCard
        handleApprove={handleApprove}
        handleReject={handleReject}
        leave={leave}
      />
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default LeaveDetailsPage;
