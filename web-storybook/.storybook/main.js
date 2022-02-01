module.exports = {
    stories: ['../../web-components/src/components/**/*.stories.tsx'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-viewport'],
    features: { emotionAlias: false }, // https://github.com/mui-org/material-ui/issues/24282#issuecomment-1000619912
}