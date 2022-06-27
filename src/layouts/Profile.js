import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Button from "../components/Button";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { changePassword, changeEmail, getProfile, logout } from "../webapi";
import InputField from "../components/InputField";
import useErrorMessage from "../hooks/useErrorMessage";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    maxWidth: "800px",
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: `1px solid ${theme.buttonPrimary}`,
    padding: "20px",
    borderRadius: "10px",
    width: "450px",
    "@media (max-width:400px)": {
      width: "90vw",
    },
  },
  buttons: {
    display: "flex",
    gap: "5px",
  },
  largeIcon: {
    transform: "scale(2)",
    marginTop: "20px",
  },
  errorMessage: {
    color: theme.fontError,
    textAlign: "center",
  },
}));

const Profile = (props) => {
  const [email, setEmail] = useState(" ");
  const [account, setAccount] = useState(" ");
  const [showLogout, setShowLogout] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const _getProfile = async () => {
      try {
        const resp = await getProfile();
        if (resp.status === "failure") throw "Failed to fetch profile.";
        if (resp.status === "success") {
          setEmail(resp.data.details.email);
          setAccount(resp.data.details.username);
        }
      } catch (e) {
        console.error(e);
      }
    };
    _getProfile();
  }, [showChangeEmail]);

  return (
    <div className={classes.root}>
      <span className={`material-symbols-outlined ${classes.largeIcon}`}>
        person
      </span>
      <h2>Profile</h2>
      <InputField label={"Account Name"} value={account} disabled />
      <InputField label={"Email address"} value={email} disabled />
      <Button
        fullWidth
        label="Change Email Address"
        onClick={() => setShowChangeEmail(true)}
      />
      <Button
        fullWidth
        label="Change Password"
        onClick={() => setShowChangePassword(true)}
      />
      <Button fullWidth label="Logout" onClick={() => setShowLogout(true)} />
      <LogoutModal isVisible={showLogout} setIsVisible={setShowLogout} />
      <ChangePasswordModal
        isVisible={showChangePassword}
        setIsVisible={setShowChangePassword}
      />
      <ChangeEmailModal
        isVisible={showChangeEmail}
        setIsVisible={setShowChangeEmail}
      />
    </div>
  );
};

const LogoutModal = ({ isVisible, setIsVisible, ...props }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleConfirmClick = async (e) => {
    try {
      await logout();
      localStorage.clear();
      setIsVisible(false);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal visible={isVisible}>
      <div className={classes.modal}>
        <h2>Confirm Logout</h2>
        <div className={classes.buttons}>
          <Button type="button" label="Confirm" onClick={handleConfirmClick} />
          <Button
            type="button"
            label="Cancel"
            onClick={() => setIsVisible(false)}
          />
        </div>
        <br />
      </div>
    </Modal>
  );
};

const ChangePasswordModal = ({ isVisible, setIsVisible, ...props }) => {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useErrorMessage(3000);

  const validatePassword = (password) => {
    return String(password).match(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/);
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      if (newPassword?.length < 8)
        return setErrorMessage("Password must be 8+ characters.");
      if (!validatePassword(newPassword))
        return setErrorMessage(
          "Password must contain 1 uppercase, 1 lowercase and 1 number."
        );
      if (newPassword !== confirmPassword)
        return setErrorMessage("Confirm Password does not match Password.");
      const result = await changePassword(oldPassword, newPassword);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelClick = (e) => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible}>
      <div className={classes.modal}>
        <h2>Change Password</h2>
        <InputField
          label="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <InputField
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className={classes.buttons}>
          <Button type="button" label="Change Password" onClick={handleClick} />
          <Button type="button" label="Cancel" onClick={handleCancelClick} />
        </div>
        <h4 className={classes.errorMessage}>{errorMessage}</h4>
      </div>
    </Modal>
  );
};

const ChangeEmailModal = ({ isVisible, setIsVisible, ...props }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorMessage, setErrorMessage] = useErrorMessage(3000);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (email !== confirmEmail)
        return setErrorMessage("Emails do not match.");
      if (!validateEmail(email)) return setErrorMessage("Email is not valid.");
      const result = await changeEmail(email);
      if (result.status === "failure" && result.data.error === "DUPLICATE")
        return setErrorMessage("Email already taken.");
      setEmail("");
      setConfirmEmail("");
      setIsVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelClick = (e) => {
    setConfirmEmail("");
    setEmail("");
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible}>
      <div className={classes.modal}>
        <h2>Change Email Address</h2>
        <InputField
          label="New Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <InputField
          label="Confirm Email Address"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value.trim())}
        />

        <div className={classes.buttons}>
          <Button type="button" label="Change Email" onClick={handleClick} />
          <Button type="button" label="Cancel" onClick={handleCancelClick} />
        </div>
        <h4 className={classes.errorMessage}>{errorMessage}</h4>
      </div>
    </Modal>
  );
};

export default Profile;
