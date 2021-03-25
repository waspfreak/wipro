import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { fonts } from "./fonts";

//import { withNotes } from "@storybook/addon-notes";
import { createUseStyles } from "react-jss";
import StoryContainer from "../components/storyContainer/StoryContainer";

const useStyles = createUseStyles(fonts);

//addDecorator(withNotes);

storiesOf("Fonts", module).add(
  "Dark",
  () => {
    const classes = useStyles();
    return (
      <StoryContainer>
        <span className={classes.Body}>Body</span>
        <span className={classes.BodyBold}>Body Bold</span>
      </StoryContainer>
    );
  },
  {
    notes:
      "Zeplin: https://app.zeplin.io/project/5dee1deaca08c2092789dbcd/screen/5dee1ee047c09b0697a12aec"
  }
);
