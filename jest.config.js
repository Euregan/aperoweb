module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFiles: ['jest-date-mock'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
