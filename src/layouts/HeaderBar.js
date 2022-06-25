import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HeaderBar = (props) => {
  const navigate = useNavigate();
  const handleLoginClick = (e) => {
    navigate("/login");
  };
  return (
    <div className="__header-bar-root">
      <div className="__header-title">Grocery List</div>
      <div className="__spacer" />
      <div className="__header-buttons">
        <Button label="Login" onClick={handleLoginClick} />
      </div>
    </div>
  );
};

export default HeaderBar;
