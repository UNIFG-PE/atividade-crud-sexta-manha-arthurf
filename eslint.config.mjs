import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    { 
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
        plugins: { js, "@stylistic": stylistic }, 
        extends: ["js/recommended"], 
        languageOptions: { globals: globals.node },
        rules: {
            "@stylistic/semi": "error"
        }
    },
    tseslint.configs.recommended,
]);
