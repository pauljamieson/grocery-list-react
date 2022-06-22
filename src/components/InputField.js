import { useRef, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    border: `1px solid ${theme.fontPrimary}`,
    borderRadius: "5px",
    padding: "10px",
    position: "relative",
    backgroundColor: theme.bgPrimary,
    maxWidth: "400px",
    width: "100%",
    cursor: "pointer",
    "&:focus-within, &:hover": {
      borderColor: theme.fontSecondary,
    },
  },
  input: {
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: theme.fontPrimary,
    backgroundColor: theme.bgPrimary,
    width: "100%",
  },
  label: {
    position: "absolute",
    background: "transparent",
    top: 10,
    transition: "top 0.1s , font-size 0.25s ",
    pointerEvents: "none",
  },
  filled: {
    transition: "top 0.1s, font-size 0.25s ",
    top: -8,
    background: theme.bgPrimary,
    fontSize: ".75rem",
  },
}));

const InputField = ({
  autocomplete,
  autofocus,
  disabled,
  name,
  placeholder,
  readonly,
  required,
  onChange,
  id,
  value,
  label,
  type,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  return (
    <div className={classes.root} onClick={() => ref.current.focus()}>
      <span
        className={`${classes.label} ${
          focused | (value?.length > 0) ? classes.filled : ""
        }`}
      >
        {label}
      </span>
      <input
        ref={ref}
        type={type}
        className={classes.input}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autocomplete}
        autoFocus={autofocus}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
    </div>
  );
};

InputField.defaultProps = {
  type: "text",
};

export default InputField;
