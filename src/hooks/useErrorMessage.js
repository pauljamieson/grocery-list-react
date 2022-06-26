import { useState } from "react";

const useErrorMessage = (duration) => {
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
