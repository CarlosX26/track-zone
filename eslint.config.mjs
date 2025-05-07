import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking",
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:jsx-a11y/strict",
  "plugin:import/recommended",
  "plugin:import/typescript",
  "plugin:prettier/recommended",
  "plugin:sonarjs/recommended", // Added for code quality
  "plugin:security/recommended", // Added for security best practices
];

export default {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import",
    "jsx-a11y",
    "unused-imports",
    "prettier",
    "sonarjs", // Added for code quality
    "security", // Added for security best practices
    "react-perf", // Added for React performance
  ],
  extends: eslintConfig,
  rules: {
    // Formatting
    "prettier/prettier": "warn",
    
    // Unused imports and variables
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "off", // Using unused-imports plugin instead
    
    // Import ordering
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "next/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    
    // React rules
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off", // Not needed in Next.js with React 17+
    "react/prop-types": "off", // Not needed with TypeScript
    
    // TypeScript rules
    "@typescript-eslint/consistent-type-imports": "error",
    
    // General code quality
    "no-console": "warn",
    
    // React performance rules
    "react-perf/jsx-no-new-object-as-prop": "warn",
    "react-perf/jsx-no-new-array-as-prop": "warn",
    "react-perf/jsx-no-new-function-as-prop": "warn",
    
    // SonarJS customizations (optional)
    "sonarjs/cognitive-complexity": ["error", 15],
    "sonarjs/no-duplicate-string": ["error", 5],
    
    // Security customizations (optional)
    "security/detect-object-injection": "warn",
  },
  overrides: [
    // Test files specific rules
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
      plugins: ["jest", "testing-library"],
      extends: [
        "plugin:jest/recommended",
        "plugin:testing-library/react"
      ],
      rules: {
        // Disable certain rules for test files
        "no-console": "off",
        "sonarjs/no-duplicate-string": "off",
      }
    }
  ]
};