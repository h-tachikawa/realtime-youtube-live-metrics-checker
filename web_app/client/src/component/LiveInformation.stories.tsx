import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { LiveInformation, Props } from "./LiveInformation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const range = (start: number, end: number) => [...Array((end - start) + 1)].map((_, i) => start + 1);

const meta: Meta<Props> = {
  title: "component/LiveInformation",
  component: LiveInformation,
  args: {
    tags: range(1, 10).map((_, i) => `タグ${i + 1}`),
    channelTitle: "テストチャンネル",
    title: "テスト配信",
    liveUrl: "https://www.youtube.com/watch?v=jEhIe2SDKso",
    thumbnailImageUrl: "https://i.ytimg.com/vi/jEhIe2SDKso/hqdefault_live.jpg",
  }
}

export const Default: Story<Props> = (args) => (
    <LiveInformation {...args}/>
);

export default meta;