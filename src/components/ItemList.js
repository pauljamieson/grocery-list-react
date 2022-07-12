import { useState } from "react";
import { createUseStyles } from "react-jss";
import { formatString } from "../helpers";
import { removeItemFromList, setItemSelectedStatus } from "../webapi";

const useStyles = createUseStyles((theme) => ({
  root: {
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    gap: theme.flexSpacing,
  },
  item: {
    border: "1px solid black",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.listItemBg,
    borderRadius: "5px",
    cursor: "pointer",
  },
  selected: {
    backgroundColor: theme.selected,
    borderColor: theme.selected,
  },
  label: {
    textAlign: "center",
    width: "100%",
  },
  removeIcon: {
    cursor: "pointer",
    "&:hover": { transform: "scale(1.2)" },
  },
}));

const ItemList = ({ listItems, setListItems, listId, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {listItems.map((val, idx) => (
        <Item
          key={idx}
          item={val}
          setListItems={setListItems}
          listItems={listItems}
          listId={listId}
        />
      ))}
    </div>
  );
};

const Item = ({ item, listItems, setListItems, listId, ...props }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(item.selected);
  const handleRemove = async (e) => {
    e.stopPropagation();
    try {
      const resp = await removeItemFromList(listId, item);
      if (resp.status !== "success") throw new Error("Failed to delete item.");
      const newList = listItems.filter((val) => val !== item);
      setListItems(newList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = async (e) => {
    try {
      const resp = await setItemSelectedStatus(listId, item, !selected);
      console.log(resp);
      //if (resp.status !== "success") throw new Error("Failed to delete item.");
      setSelected(!selected);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${classes.item} ${selected ? classes.selected : ""}`}
      onClick={handleClick}
    >
      <div className={classes.label}>{formatString(item.name)}</div>
      <span
        onClick={handleRemove}
        className={`material-symbols-outlined ${classes.removeIcon}`}
      >
        remove_circle_outline
      </span>
    </div>
  );
};

export default ItemList;
