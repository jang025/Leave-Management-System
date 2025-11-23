import { useId } from "react";
import { Link } from "react-router";
import styles from "./AuthForm.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.h1}>{title}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor={`${id}-username`}>Username: </label>
        <input
          type="text"
          id={`${id}-username`}
          name="username"
          placeholder="Enter your username"
          value={user.username}
          onChange={handleChange}
          required
          className={styles.input}
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
          className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
            />

            <label htmlFor={`${id}-role`}>Role: </label>
            <select
              id={`${id}-role`}
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </>
        )}
        <button type="submit" className={styles.button}>
          {buttonText}
        </button>
      </form>
      <p className={styles.p}>
        {redirectText} <Link to={redirectLink}>Click here</Link>
      </p>
    </div>
  );
}

export default AuthForm;
