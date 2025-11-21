import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router";
import { signup } from "../services/authService";

const SignupPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup(user);
      console.log(response);
      if (!response.token) {
        throw new Error("Signup failed");
      }

      //! only store token in local storage for security purposes
      localStorage.setItem("token", response.token);
      //! storing used id as i need it for the routes
      localStorage.setItem("userId", response.user.id);
      //! redirects user to employee / manager dashboard page
      navigate(
        response.user.role === "manager"
          ? `/manager/${response.user.id}`
          : `/employee/${response.user.id}`
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthForm
      title="Create Account"
      buttonText="Sign Up"
      redirectText="Already have an account?"
      redirectLink="/signin"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      user={user}
    />
  );
};

export default SignupPage;
