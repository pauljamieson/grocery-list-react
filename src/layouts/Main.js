import { Route, Routes } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import LoginForm from "./LoginForm";

const Main = (props) => {
  return (
    <div className="__app-root">
      <div className="__app-header">
        <HeaderBar />
      </div>
      <div className="__app-content">
        <Routes>
          <Route path="/" component={<div>a</div>} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </div>
      <div className="__app-footer">Footer</div>
    </div>
  );
};

export default Main;
