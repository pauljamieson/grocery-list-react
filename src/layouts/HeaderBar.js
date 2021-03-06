import { useNavigate, NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Button from "../components/Button";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    padding: "0px 5px",
    borderBottom: `1px solid ${theme.fontPrimary}`,
  },
  buttonBar: {
    display: "flex",
    marginRight: "5px",
    gap: "5px",
    transform: "scale(1)",
    transition: "transform .25s ease",
    "& .active > button ": {
      transform: "scale(1.15)",
      transition: "transform .25s ease",
      backgroundColor: theme.buttonPrimaryHover,
    },
  },
  spacer: { flexGrow: 1 },
  title: {
    fontSize: "1.5rem",
  },
}));

const HeaderBar = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleLoginClick = (e) => navigate("/login");
  const handleProfileClick = (e) => navigate("/profile");
  const handleListsClick = (e) => navigate("/grocery-lists");

  return (
    <div className={classes.root}>
      <div className={classes.title}>Grocery List</div>
      <div className={classes.spacer} />
      <div className={classes.buttonBar}>
        {localStorage.getItem("username") === null ? (
          <NavLink to={"/login"}>
            <Button label="Login" onClick={handleLoginClick} />
          </NavLink>
        ) : (
          <>
            <NavLink to={"/grocery-lists"}>
              <Button label="Lists" onClick={handleListsClick} />
            </NavLink>
            <NavLink to={"/profile"}>
              <Button label="Profile" onClick={handleProfileClick} />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
