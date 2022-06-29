import { useState } from "react";
import { createUseStyles } from "react-jss";
import Button from "../components/Button";
import InputField from "../components/InputField";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.flexSpacing,
    maxWidth: theme.appWidth,
    
    alignItems: "center",
    flexGrow: 1,
  },
  buttons: {
    display: "flex",
    gap: theme.flexSpacing,
  },
}));

const NewGroceryList = (props) => {
  const classes = useStyles();
  const [listName, setListName] = useState("");
  return (
    <div className={classes.root}>
      <h2>New Grocery List</h2>
      <InputField
        label="Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <div className={classes.buttons}>
        <Button label={"Add Items"} />
        <Button label={"Add Recipes"} />
      </div>
    </div>
  );
};

export default NewGroceryList;
