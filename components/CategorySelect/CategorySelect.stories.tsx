import React from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import CategorySelect from "./CategorySelect"
import { SvgIcon } from "@mui/material"
import PlaceholderIcon from "@mui/icons-material/HelpOutlineOutlined"

export default {
  title: "CategorySelect",
  component: CategorySelect,
} as ComponentMeta<typeof CategorySelect>

export const Primary: ComponentStory<typeof CategorySelect> = () => (
  <CategorySelect onChange={() => {}} />
)

export const Secondary = () => (
  <SvgIcon fontSize="large">
    <PlaceholderIcon></PlaceholderIcon>
  </SvgIcon>
)
