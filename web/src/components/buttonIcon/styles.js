import { createUseStyles } from "react-jss";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const useStyles = createUseStyles({
  default: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    height: 30,
    width: 30,
    borderWidth: 0
  },
  icon: {
    display: "flex",
    alignSelf: "center"
  }
});

export default useStyles;
