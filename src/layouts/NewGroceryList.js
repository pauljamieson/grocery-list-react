import { useState } from "react";
import { createUseStyles } from "react-jss";
import ItemList from "../components/ItemList";
import InputField from "../components/InputField";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { createGroceryList } from "../webapi";
import { useNavigate } from "react-router-dom";
import useErrorMessage from "../hooks/useErrorMessage";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.flexSpacing,
    maxWidth: theme.appWidth,
    alignItems: "center",
    flexGrow: 1,
  },
  searchBar: {
    display: "flex",
    maxWidth: "400px",
    width: "100%",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.bgSecondary,
    maxWidth: "400px",
    width: "100%",
    height: "100%",
    minHeight: "400px",
    marginBottom: "10px",
  },
  errorMessage: {
    color: theme.fontError,
    textAlign: "center",
  },
}));

const NewGroceryList = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useErrorMessage(3000);
  const [listName, setListName] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      setListItems([...listItems, e.target.value]);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    const newList = {
      name: listName !== "" ? listName : new Date().toDateString(),
      items: listItems,
    };

    try {
      const result = await createGroceryList(newList);
      if (result.status === "success") return navigate("/grocery-lists");
      setErrorMsg("Failed to create new list.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.root}>
      <h2>New Grocery List</h2>
      <InputField
        label="Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <div className={classes.searchBar}>
        <Button label={"Save"} fullWidth onClick={handleSave} />
      </div>
      <span className={classes.errorMessage}>{errorMsg}</span>
      <div className={classes.searchBar}>
        <SearchBar placeholder="Find Grocery Items" onKeyDown={handleAdd} />
      </div>
      <div className={classes.itemList}>
        <ItemList listItems={listItems} setListItems={setListItems} />
      </div>
    </div>
  );
};

export default NewGroceryList;
