import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import ListList from "../components/ListList";
import SearchBar from "../components/SearchBar";
import { debounce } from "../helpers";
import { createGroceryList, getGroceryLists } from "../webapi";
import Modal from "./Modal";

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
  listBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.bgSecondary,
    maxWidth: "800px",
    width: "100%",
    height: "100%",
    minHeight: "400px",
    marginBottom: "10px",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: `1px solid ${theme.buttonPrimary}`,
    padding: "20px",
    borderRadius: "10px",
    width: "450px",
    "@media (max-width:400px)": {
      width: "90vw",
    },
  },
  buttons: {
    display: "flex",
    gap: "5px",
  },
  spacer: {
    display: "none",
    "@media (min-width:400px)": {
      display: "block",
      height: "33vh",
    },
  },
}));

const GroceryLists = (props) => {
  const [searchTerms, setSearchTerms] = useState("");
  const [lists, setLists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getLists = async () => {
      if (showCreateModal === true) return;
      try {
        const resp = await getGroceryLists();
        setLists(resp.data.lists);
      } catch (e) {
        console.error(e);
      }
    };
    getLists();
  }, [showCreateModal]);

  const onChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
  };

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <SearchBar
          placeholder={"Find Grocery List"}
          value={searchTerms}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <Button label="Create List" onClick={() => setShowCreateModal(true)} />
      </div>
      <br />
      <div className={classes.listBox}>
        <ListList
          lists={lists.filter((val) => val.name.includes(searchTerms))}
          setLists={setLists}
        />
      </div>
      <CreateListModal
        isVisible={showCreateModal}
        setIsVisible={setShowCreateModal}
      />
    </div>
  );
};

const CreateListModal = ({ isVisible, setIsVisible, ...props }) => {
  const classes = useStyles();
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resp = await createGroceryList(
        listName === "" ? new Date().toDateString() : listName
      );
      if (resp.status !== "success")
        throw new Error("Failed to create new grocery list.");
      const { id } = resp.data;
      setListName("");
      setIsVisible(false);
      navigate(`/grocery-list/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelClick = (e) => {
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible}>
      <div className={classes.modal}>
        <h2>Create New List</h2>
        <InputField
          label="New List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value.trim())}
        />
        <div className={classes.buttons}>
          <Button type="button" label="Create List" onClick={handleClick} />
          <Button type="button" label="Cancel" onClick={handleCancelClick} />
        </div>
      </div>
      <div className={classes.spacer} />
    </Modal>
  );
};

export default GroceryLists;
