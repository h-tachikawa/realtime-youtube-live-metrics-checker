module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/preset-create-react-app",
    {
      name: '@storybook/addon-essentials',
      options: {
        "docs": false,
      }
    }
  ],
}
