import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { SettingsHeader } from "./SettingsHeader";

export default {
    title: "component/SettingsHeader",
    component: SettingsHeader
} as Meta

export const Default: Story = () => <SettingsHeader />