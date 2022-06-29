import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";

const useStyles = createUseStyles((theme) => ({
  root: {
    maxWidth: theme.appWidth,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  topBar: {
    display: "flex",
    width: "100%",
    gap: theme.flexSpacing,
  },
}));

const GroceryLists = (props) => {
  const [searchTerms, setSearchTerms] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) => {
    setSearchTerms(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <SearchBar
          placeholder={"Find Grocery List"}
          value={searchTerms}
          onChange={onChange}
        />
        <Button
          label="Create List"
          onClick={() => navigate("/new-grocery-list")}
        />
      </div>
    </div>
  );
};

export default GroceryLists;
