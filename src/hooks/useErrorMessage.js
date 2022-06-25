import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  textColor: {
    color: theme.errorMessage,
  },
}));

const useErrorMessage = (duration) => {
  const theme = useTheme();
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(null);

  const showError = (newError) => {
    if (timer) clearTimeout(timer);
    typeof newError !== "string"
      ? setMessage("Unknown Error")
      : setMessage(newError);
    setTimer(setTimeout(() => setMessage(null), duration));
  };

  return [message, showError];
};

export default useErrorMessage;
