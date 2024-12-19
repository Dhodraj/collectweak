const jsAndTsFiles = ["src/**/*.ts", "src/**/*.js"];

module.exports = [
    {
        files: jsAndTsFiles, // Files to lint
        ignores: ["node_modules", "dist"], // Ignore node_modules and build directories
        languageOptions: {
            ecmaVersion: "latest", // ECMAScript version
            sourceType: "module", // Use ES modules
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: {
            "no-unused-vars": "warn", // Warn on unused variables
            "no-console": "warn", // Warn on console.log
            "@typescript-eslint/no-explicit-any": "error", // Disallow 'any' type in TypeScript
            "@typescript-eslint/explicit-function-return-type": "off", // Optional return type
        },
    },
];
