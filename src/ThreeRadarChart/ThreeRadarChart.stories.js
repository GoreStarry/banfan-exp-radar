import React from "react";

import ThreeRadarChart from "./ThreeRadarChart.jsx";

export default {
  title: "Example/Radar Chart",
  component: ThreeRadarChart,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ThreeRadarChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};
