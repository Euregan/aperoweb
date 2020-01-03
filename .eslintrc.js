module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
        'jest/globals': true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
    rules: {
        'prettier/prettier': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
