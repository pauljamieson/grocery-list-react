import { Route, Routes } from "react-router-dom";
import GroceryLists from "./GroceryLists";
import HeaderBar from "./HeaderBar";
import LandingPage from "./LandingPage";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import SignUpForm from "./SignUpForm";

const Main = (props) => {
  return (
    <div className="__app-root">
      <div className="__app-header">
        <HeaderBar />
      </div>
      <div className="__app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/grocery-lists" element={<GroceryLists />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <div className="__app-footer">Footer</div>
    </div>
  );
};

export default Main;
