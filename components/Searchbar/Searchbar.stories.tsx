import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"

import Searchbar from "./Searchbar"

// https://storybook.js.org/docs/react/essentials/controls

export default {
  title: "Searchbar",
  component: Searchbar,
  argTypes: {
    filterValue: {
      control: "text",
    },
  },
} as ComponentMeta<typeof Searchbar>

export const Primary: ComponentStory<typeof Searchbar> = args => <Searchbar {...args} />
