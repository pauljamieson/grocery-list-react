import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import useErrorMessage from "../hooks/useErrorMessage";
import { signUp } from "../webapi";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "800px",
    width: "100%",
    alignItems: "center",
  },
  inputFields: {
    width: "100%",
  },
  largeIcon: {
    marginTop: "20px",
    transform: "scale(2)",
  },
  errorMessage: {
    color: theme.fontError,
    textAlign: "center",
  },
}));

const SignUpForm = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles({ ...props, theme });
  const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useErrorMessage(3000);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).match(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/);
  };

  const handleClick = async (e) => {
    setUsername(username.trim());
    setPassword(password.trim());
    setEmail(email.trim());
    e.preventDefault();
    if (username?.length < 4)
      return setErrorMessage("Username must be 4+ characters.");
    if (!validateEmail(email)) return setErrorMessage("Email is not valid.");
    if (password?.length < 8)
      return setErrorMessage("Password must be 8+ characters.");
    if (!validatePassword(password))
      return setErrorMessage(
        "Password must contain 1 uppercase, 1 lowercase and 1 number."
      );
    if (password !== confirmPassword)
      return setErrorMessage("Confirm Password does not match Password.");
    const result = await signUp(username, email, password);
    if (result.status === "failure" && result.data.error === "DUPLICATE")
      return setErrorMessage("Username or Email already taken.");
    if (result.status === "failure")
      return setErrorMessage("Failed to create user for unknown reason.");
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <span className={`material-symbols-outlined ${classes.largeIcon}`}>
        person
      </span>
      <h2>Signup</h2>
      <form className={classes.root}>
        <InputField
          id="username"
          onChange={handleUsernameChange}
          value={username}
          label="Username"
          autocomplete={"username"}
        />
        <InputField
          id="email"
          onChange={handleEmailChange}
          value={email}
          label="Email Address"
          type="email"
          autocomplete={"email"}
        />
        <InputField
          id="password"
          onChange={handlePasswordChange}
          value={password}
          label="Password"
          type="password"
          autocomplete={"new-password"}
        />
        <InputField
          id="password-confirm"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          label="Confirm Password"
          type="password"
          autocomplete={"new-password"}
        />
        <div></div>
        <Button label="Sign Up" fullWidth={true} onClick={handleClick} />
      </form>
      <h4 className={classes.errorMessage}>{errorMessage}</h4>
    </div>
  );
};

export default SignUpForm;
