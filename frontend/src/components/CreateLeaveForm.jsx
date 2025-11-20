const CreateLeaveForm = () => {
  return (
    <form>
      <label>
        Leave Type:
        <select>
          <option value="annual">Annual Leave</option>
          <option value="sick">Sick Leave</option>
        </select>
      </label>

      <label>
        Start Date:
        <input type="date" />
      </label>

      <label>
        End Date:
        <input type="date" />
      </label>

      <label>
        Reason:
        <textarea placeholder="Reason for leave..." />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateLeaveForm;
