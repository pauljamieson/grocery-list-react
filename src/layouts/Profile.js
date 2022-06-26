import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Button from "../components/Button";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const useStyles = createUseStyles((theme) => ({
  root: {},
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    gap: "5px",
  },
}));
const Profile = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfirmClick = (e) => {
    localStorage.clear();
    setIsVisible(false);
    navigate("/login");
  };

  return (
    <div>
      <Modal visible={isVisible}>
        <div className={classes.modal}>
          <h2>Confirm Logout</h2>
          <div className={classes.buttons}>
            <Button
              type="button"
              label="Confirm"
              onClick={handleConfirmClick}
            />
            <Button
              type="button"
              label="Cancel"
              onClick={() => setIsVisible(false)}
            />
          </div>
        </div>
      </Modal>
      <Button label="Logout" onClick={() => setIsVisible(true)} />
    </div>
  );
};

export default Profile;
