import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { DashboardHeader } from "./DashboardHeader";

export default {
    title: "component/DashboardHeader",
    component: DashboardHeader,
} as Meta;

export const Default: Story = () => <DashboardHeader />