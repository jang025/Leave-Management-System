import { useId } from "react";

const CreateLeaveForm = ({ handleSubmit, handleChange, user }) => {
  // useId hook is used when multiple forms exist on the same page
  const id = useId();
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`${id}-leaveType`}>Leave Type: </label>
      <select
        id={`${id}-leaveType`}
        name="leaveType"
        value={user.leaveType}
        onChange={handleChange}
        required
      >
        <option value="">Select Type</option>
        <option value="annual">Annual</option>
        <option value="sick">Sick</option>
      </select>

      <label htmlFor={`${id}-startDate`}>Start Date: </label>
      <input
        type="date"
        id={`${id}-startDate`}
        name="startDate"
        value={user.startDate}
        onChange={handleChange}
        required
      />
      <label htmlFor={`${id}-endDate`}>End Date: </label>
      <input
        type="date"
        id={`${id}-endDate`}
        name="endDate"
        value={user.endDate}
        onChange={handleChange}
        required
      />
      <label htmlFor={`${id}-reason`}>End Date: </label>
      <textarea
        id={`${id}-reason`}
        name="reason"
        value={user.reason}
        placeholder="Enter your reason for leave"
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateLeaveForm;
