import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { formatString } from "../helpers";
import { deleteGroceryList } from "../webapi";

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
  label: {
    width: "100%",
  },
  date: {
    fontSize: ".5rem",
  },
  removeIcon: {
    cursor: "pointer",
    zIndex: "100",
    "&:hover": { transform: "scale(1.2)" },
  },
}));

const ListList = ({ lists, setLists, itemClick, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {lists.map((val, idx) => (
        <List
          key={idx}
          value={val}
          setLists={setLists}
          lists={lists}
          onClick={itemClick}
        />
      ))}
    </div>
  );
};

const List = ({ value, lists, setLists, ...props }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { name, _id, date } = value;

  const formatDate = (date) => {
    const newDate = new Date(parseInt(date));
    return newDate.toLocaleDateString();
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    try {
      const resp = await deleteGroceryList(_id);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
    const newLists = lists.filter((val) => {
      return val._id !== _id;
    });
    setLists(newLists);
  };

  const onClick = (e) => {
    navigate(`/grocery-list/${_id}`);
  };

  return (
    <div className={classes.item} onClick={onClick}>
      <span className={classes.label}>
        {formatString(name)}{" "}
        <span className={classes.date}>({formatDate(date)}) </span>
      </span>

      <span
        onClick={handleRemove}
        className={`material-symbols-outlined ${classes.removeIcon}`}
      >
        remove_circle_outline
      </span>
    </div>
  );
};

export default ListList;
