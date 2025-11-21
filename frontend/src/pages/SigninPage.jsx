import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { signin } from "../services/authService";
import { useNavigate } from "react-router";

const SigninPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signin(user);
      console.log(response);
      if (!response.token) {
        throw new Error("Signin failed");
      }
      //! only store token in local storage for security purposes
      localStorage.setItem("token", response.token);
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
      title="Welcome Back"
      buttonText="Sign in"
      redirectText="Don't have an account?"
      redirectLink="/signup"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      user={user}
    />
  );
};

export default SigninPage;
