// Button.stories.ts|tsx

import React from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import AutomationRulesEdit from "./AutomationRulesEdit"

export default {
  title: "AutomationRulesEdit",
  component: AutomationRulesEdit,
} as ComponentMeta<typeof AutomationRulesEdit>

export const Primary: ComponentStory<typeof AutomationRulesEdit> = () => (
  <AutomationRulesEdit onSave={() => {}} onCancel={() => {}} />
)
