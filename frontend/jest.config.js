const config = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/src/unit_tests/stub.js',
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}

export default config;