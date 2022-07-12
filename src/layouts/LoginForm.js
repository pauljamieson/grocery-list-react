import { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../webapi";
import useErrorMessage from "../hooks/useErrorMessage";

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
  links: {
    display: "flex",
    maxWidth: "400px",
    width: "100%",
    color: theme.fontPrimary,
  },
  link: {
    color: "inherit",
  },
  spacer: {
    flexGrow: 1,
  },
  errorMessage: {
    color: theme.fontError,
    textAlign: "center",
  },
}));

const LoginForm = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles({ ...props, theme });
  const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [errorMessage, setErrorMessage] = useErrorMessage(3000);
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/profile");
  }, [navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result = await login(username.trim(), password.trim());
      if (result.status === "failure") throw new Error("Failed to login.");
      if (result.status === "success") navigate("/grocery-lists");
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return (
    <div className={classes.root}>
      <span className={`material-symbols-outlined ${classes.largeIcon}`}>
        account_circle
      </span>
      <h2>Sign In</h2>
      <form className={classes.root}>
        <InputField
          id="username"
          onChange={handleUsernameChange}
          value={username}
          label="Username"
          autocomplete={"username"}
        />
        <InputField
          id="password"
          onChange={handlePasswordChange}
          value={password}
          label="Password"
          type="password"
          autocomplete={"current-password"}
        />

        <Button
          label="Sign In"
          type="submit"
          fullWidth={true}
          onClick={handleClick}
        />
      </form>
      <div className={classes.links}>
        <Link className={classes.link} to="/reset-password">
          Forgot Password
        </Link>
        <div className={classes.spacer} />
        <Link className={classes.link} to="/sign-up">
          Create A New Account
        </Link>
      </div>
      <h4 className={classes.errorMessage}>{errorMessage}</h4>
    </div>
  );
};

export default LoginForm;
