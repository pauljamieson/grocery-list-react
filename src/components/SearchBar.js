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
  placeholder,
  value,
  onChange,
  onKeyDown,
  suggestions,
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
        onKeyDown={onKeyDown}
        type="text"
        list="options"
      ></input>
      <datalist className={classes.option} id="options">
        {suggestions.map((val, idx) => (
          <option className={classes.option} key={idx}>
            {val}
          </option>
        ))}
      </datalist>
    </div>
  );
};

SearchBar.defaultProps = { placeholder: "Search", suggestions: [] };

export default SearchBar;
