import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}));

const LandingPage = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  return (
    <div className={classes.root}>
      <h2> Welcome To Grocery Lists.</h2>
    </div>
  );
};

export default LandingPage;
