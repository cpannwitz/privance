// Button.stories.ts|tsx

import React from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import Stat from "./Stat"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Stat",
  component: Stat,
  argTypes: {
    label: {
      type: "string",
      defaultValue: "123",
    },
    sublabel: {
      type: "string",
      defaultValue: "wtf",
    },
    heading: {
      type: "string",
      defaultValue: "hello",
    },
    color: {
      type: "string",
    },
  },
} as ComponentMeta<typeof Stat>

export const Primary: ComponentStory<typeof Stat> = args => <Stat {...args} />
