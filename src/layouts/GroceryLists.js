import { useEffect } from "react";

const GroceryLists = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>Grocery Lists</div>;
};

export default GroceryLists;
