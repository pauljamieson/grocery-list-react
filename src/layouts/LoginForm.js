import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../components/Button";
import InputField from "../components/InputField";

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

  return (
    <div className={classes.root}>
      <span className={`material-symbols-outlined ${classes.largeIcon}`}>
        account_circle
      </span>
      <h2>Sign In</h2>
      <InputField
        id="username"
        onChange={handleUsernameChange}
        value={username}
        label="Username"
      />
      <InputField
        id="password"
        onChange={handlePasswordChange}
        value={password}
        label="Password"
        type="password"
      />
      <div>
        <input id="remember-me" type="checkbox" />
        <label htmlFor="remember-me">Remember Me</label>
      </div>
      <Button />
    </div>
  );
};

export default LoginForm;
