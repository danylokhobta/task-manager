import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import { parser } from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    parser: parser,  // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2020, // Use the latest ECMAScript version
      sourceType: 'module', // Allow ECMAScript modules
      ecmaFeatures: {
        jsx: true, // Enable JSX parsing
      },
    },
    plugins: {
      js, 
      '@typescript-eslint': tseslint,  // Use the typescript-eslint plugin
      'react': pluginReact,  // Use the React plugin
    },
    extends: [
      'eslint:recommended',  // Use recommended ESLint rules
      'plugin:react/recommended',  // Use recommended React rules
      'plugin:@typescript-eslint/recommended',  // Use recommended TypeScript rules
      'plugin:react-hooks/recommended',  // React hooks recommended rules
      'plugin:prettier/recommended',  // Add Prettier integration
    ],
    rules: {
      'react/prop-types': 'off',  // Disable prop-types checking since we're using TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',  // Warn about unused variables
      '@typescript-eslint/explicit-module-boundary-types': 'off',  // Optional rule, depends on your preferences
      'prettier/prettier': 'warn',  // Integrate Prettier for formatting
    },
    settings: {
      react: {
        version: 'detect',  // Automatically detect React version
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],  // TypeScript specific rules
    languageOptions: {
      globals: globals.browser,  // Enable browser global variables
    },
  },
]);
