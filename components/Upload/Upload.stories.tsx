// Button.stories.ts|tsx

import React from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import UploadPreview from "./UploadPreview"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "UploadPreview",
  component: UploadPreview,
} as ComponentMeta<typeof UploadPreview>

export const Primary: ComponentStory<typeof UploadPreview> = () => (
  <UploadPreview transactions={[]} onCancel={() => {}} onUpload={() => {}} />
)
