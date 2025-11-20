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
  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={handleChange}
          required
        />
        {title === "Create Account" && (
          <>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />
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
