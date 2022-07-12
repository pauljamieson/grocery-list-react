import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList";
import SearchBar from "../components/SearchBar";
import { debounce, formatString } from "../helpers";
import { addItemToList, getGroceryList, getItems } from "../webapi";

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
  h2: {
    height: "29px",
  },
}));

const GroceryList = (props) => {
  const { id } = useParams();
  const classes = useStyles();
  const [update, setUpdate] = useState(true);
  const [listDetails, setListDetails] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const resp = await getGroceryList(id);
        if (!resp.status === "success")
          throw new Error("Failed to get grocery list details.");
        setListDetails(resp.data.list[0]);
        setListItems(resp.data.list[1]);
      } catch (e) {
        console.error(e);
      }
    };
    getList();
  }, [id, update]);

  const handleAdd = async (e) => {
    try {
      if (e.key === "Enter" && e.target.value.length > 0) {
        const resp = await addItemToList(id, e.target.value);
        if (resp.status === "success") {
          setUpdate(!update);
          e.target.value = "";
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = async (e) => {
    try {
      if (e.target.value === "") return setSuggestions([]);
      const resp = await getItems(e.target.value);
      if (resp.status === "success")
        setSuggestions(resp.data.items.map((val) => val.name));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.h2}>{formatString(listDetails?.name)}</h2>
      <div className={classes.searchBar}>
        <SearchBar
          placeholder="Find Grocery Items"
          onChange={debounce(handleChange, 500)}
          onKeyDown={handleAdd}
          suggestions={suggestions}
        />
      </div>
      <div className={classes.itemList}>
        <ItemList
          listItems={listItems}
          setListItems={setListItems}
          listId={id}
        />
      </div>
    </div>
  );
};

export default GroceryList;
