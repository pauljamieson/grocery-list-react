import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: "10px",
    backgroundColor: theme.bgSecondary,
    borderRadius: "5px",
    flexGrow: 1,
    display: "flex",
  },
  input: {
    backgroundColor: theme.bgSecondary,
    outline: "none",
    border: "none",
    caretColor: theme.fontPrimary,
    width: "100%",
    color: theme.fontPrimary,
  },
}));

const SearchBar = ({
  id,
  name,
  placeholder = false,
  value,
  onChange,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className="material-symbols-outlined">search</span>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classes.input}
        type="text"
      ></input>
    </div>
  );
};

SearchBar.defaultProps = { placeholder: "Search" };

export default SearchBar;
