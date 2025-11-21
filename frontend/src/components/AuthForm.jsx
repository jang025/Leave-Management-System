import { useId } from "react";
import { NavLink } from "react-router";

function AuthForm({
  title,
  buttonText,
  redirectText,
  redirectLink,
  handleSubmit,
  handleChange,
  user,
}) {
  // useId hook is used when multiple forms exist on the same page
  const id = useId();
  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`${id}-username`}>Username: </label>
        <input
          type="text"
          id={`${id}-username`}
          name="username"
          placeholder="Enter your username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label htmlFor={`${id}-password`}>Password: </label>
        <input
          type="password"
          id={`${id}-password`}
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={handleChange}
          required
        />
        {title === "Create Account" && (
          <>
            <label htmlFor={`${id}-confirmPassword`}>Confirm Password: </label>
            <input
              type="password"
              id={`${id}-confirmPassword`}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor={`${id}-email`}>Email: </label>
            <input
              type="email"
              id={`${id}-email`}
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />

            <label htmlFor={`${id}-role`}>Role: </label>
            <select
              id={`${id}-role`}
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </>
        )}
        <button type="submit">{buttonText}</button>
      </form>
      <p>
        {redirectText} <NavLink to={redirectLink}>Click here</NavLink>
      </p>
    </div>
  );
}

export default AuthForm;
