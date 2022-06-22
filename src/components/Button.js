import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    minHeight: "20px",
    minWidth: "20px",
    maxWidth: "400px",
    backgroundColor: theme.buttonPrimary,
    padding: "10px",
    color: theme.fontPrimary,
    cursor: "pointer",
    border: "none",
    "&:hover": {
      backgroundColor: theme.buttonPrimaryHover,
    },
    "&:active": {
      backgroundColor: theme.buttonPrimary,
    },
  },
  fullWidth: {
    width: "100%",
  },
}));

const Button = ({
  label,
  name,
  type,
  disabled,
  autofocus,
  fullWidth,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  return (
    <button
      className={`${classes.root} ${fullWidth ? classes.fullWidth : ""}`}
      value={label}
      autoFocus={autofocus}
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: "submit",
};
export default Button;
