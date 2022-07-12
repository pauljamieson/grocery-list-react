import { Route, Routes, Navigate } from "react-router-dom";
import GroceryList from "./GroceryList";
import GroceryLists from "./GroceryLists";
import HeaderBar from "./HeaderBar";
import LandingPage from "./LandingPage";
import LoginForm from "./LoginForm";
import NewGroceryList from "./NewGroceryList";
import Profile from "./Profile";
import SignUpForm from "./SignUpForm";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "60px auto",
    height: "100vh",
    backgroundColor: theme.bgPrimary,
    color: theme.fontPrimary,
    overflow: "auto",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
}));

const Main = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <HeaderBar />
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/grocery-lists" element={<GroceryLists />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/new-grocery-list" element={<NewGroceryList />} />
          <Route path="/grocery-list/:id" element={<GroceryList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
