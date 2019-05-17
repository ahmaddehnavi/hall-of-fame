const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    setupFilesAfterEnv: ["<rootDir>__test__/setup.js"],
    transform: {
        ...tsjPreset.transform,
        '\\.(ts|tsx)$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },

    // mock all raw files
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
    },
    // need parsed by babel
    transformIgnorePatterns:[
        "node_modules/(?!(jest-)?react-native|react-navigation)"
    ],
    globals: {
        'ts-jest': {
            babelConfig: true,
        }
    },
    coverageReporters: [
        'json-summary',
        'text',
        'lcov'
    ]
};