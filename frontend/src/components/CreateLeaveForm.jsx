import { useId } from "react";
import styles from "./CreateLeaveForm.module.css";

const CreateLeaveForm = ({ handleSubmit, handleChange, user }) => {
  // useId hook is used when multiple forms exist on the same page
  const id = useId();
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor={`${id}-leaveType`}>Leave Type: </label>
      <select
        id={`${id}-leaveType`}
        name="leaveType"
        value={user.leaveType}
        onChange={handleChange}
        required
        className={styles.select}
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
        className={styles.input}
      />
      <label htmlFor={`${id}-endDate`}>End Date: </label>
      <input
        type="date"
        id={`${id}-endDate`}
        name="endDate"
        value={user.endDate}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <label htmlFor={`${id}-reason`}>End Date: </label>
      <textarea
        id={`${id}-reason`}
        name="reason"
        value={user.reason}
        placeholder="Enter your reason for leave"
        onChange={handleChange}
        required
        className={styles.textarea}
      />

      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default CreateLeaveForm;
