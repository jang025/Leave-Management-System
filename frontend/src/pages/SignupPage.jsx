import { useState } from "react";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("sign up successful");
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
