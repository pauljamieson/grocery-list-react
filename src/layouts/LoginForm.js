import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

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
}));

const LoginForm = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    console.error("Clicked");
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
        <div>
          <input id="remember-me" type="checkbox" />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <Button label="Sign In" fullWidth={true} onClick={handleClick} />
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
    </div>
  );
};

export default LoginForm;
