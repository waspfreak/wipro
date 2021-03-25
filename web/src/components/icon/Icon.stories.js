import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Icon from "./Icon";

import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import StoryContainer from "../storyContainer/StoryContainer";

storiesOf("Icon", module)
  .addDecorator(withKnobs)
  .add("Arrow", () => <Icon icon={text("icon", "Arrow")} />, {
    notes: "Icon: "
  });
