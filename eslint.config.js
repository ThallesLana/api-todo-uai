import * as tseslint from "typescript-eslint"; 
import pluginJs from "@eslint/js";
import globals from "globals";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended, 
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            // O parser está aninhado no objeto tseslint
            parser: tseslint.parser, 
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            }
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        },
    },
    pluginPrettierRecommended
);