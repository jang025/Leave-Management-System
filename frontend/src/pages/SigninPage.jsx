import { useState } from "react";
import AuthForm from "../components/AuthForm";

const SigninPage = () => {
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
    console.log("sign in successful");
  };

  return (
    <AuthForm
      title="Welcome Back"
      buttonText="Sign in"
      redirectText="Don't have an account?"
      redirectLink="/signup"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default SigninPage;
