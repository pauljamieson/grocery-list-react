import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: 1000,
  },
  window: {
    backgroundColor: theme.bgPrimary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
}));

const Modal = ({ visible, ...props }) => {
  const classes = useStyles();

  return (
    <div hidden={visible ? false : true} className={classes.root}>
      <div className={classes.window}>{props.children}</div>
    </div>
  );
};

Modal.defaultProps = {
  visible: false,
};

export default Modal;
