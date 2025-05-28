import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import preferArrowPlugin from "eslint-plugin-prefer-arrow";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  jsdocPlugin.configs["flat/recommended"],
  prettierConfig,
  {
    plugins: {
      "react-hooks": hooksPlugin
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      // below rule is not compatible with EsLint version bigger than 9.0.0
      "react-hooks/exhaustive-deps": "off"
    }
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      "src/locales.d.ts",
      "src/styled.d.ts",
      "**/*.js"
    ]
  },
  {
    files: ["**/*.{ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        warnOnUnsupportedTypeScriptVersion: true
      }
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
      "prefer-arrow": preferArrowPlugin
    },
    rules: {
      "no-console": "warn",
      "dot-notation": "off",
      "no-shadow": "off",
      "arrow-body-style": ["warn", "as-needed"],
      "no-extra-boolean-cast": "off",
      eqeqeq: ["error", "smart"],
      curly: ["error", "all"],
      "brace-style": ["off", "off"],
      radix: "error",
      "prefer-template": "error",
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "prefer-const": [
        "error",
        {
          destructuring: "all"
        }
      ],
      "prefer-destructuring": [
        "warn",
        {
          array: false,
          object: true
        }
      ],
      "object-shorthand": "error",
      "no-var": "error",
      "no-throw-literal": "error",
      "no-new-wrappers": "error",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-eval": "error",
      "no-cond-assign": "error",
      "no-bitwise": "error",
      "max-len": [
        "error",
        {
          code: 200
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      complexity: "off",
      "consistent-return": "off",
      "prefer-arrow-callback": "error",
      "space-in-parens": ["off", "never"],
      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"]
        }
      ],
      // jsdoc Rules
      "jsdoc/require-jsdoc": "off",
      "jsdoc/check-alignment": "off",
      "jsdoc/check-indentation": "off",
      "jsdoc/tag-lines": [
        "error",
        "always",
        {
          startLines: 1,
          endLines: 0,
          applyToEndTag: false
        }
      ],
      // typescript-eslint Custom Rules
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple"
        }
      ],
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow"
        },
        {
          selector: "typeLike",
          format: ["PascalCase"]
        }
      ],
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/unified-signatures": "error",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/consistent-indexed-object-style": [
        "error",
        "index-signature"
      ],
      // import Config Rules
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always",
          groups: [
            ["builtin", "external"],
            ["internal", "unknown"],
            ["parent"],
            ["sibling"]
          ],
          pathGroups: [
            {
              pattern: "components/**",
              group: "internal"
            },
            {
              pattern: "lib/**",
              group: "internal"
            },
            {
              pattern: "localization/**",
              group: "internal"
            },
            {
              pattern: "utils/**",
              group: "internal"
            },
            // TODO: add other internal groups each folder in the root of project is considered as a group
          ],
          pathGroupsExcludedImportTypes: []
        }
      ],
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true
        }
      ],
      // Arrow Function Config Rules
      "prefer-arrow/prefer-arrow-functions": [
        "warn",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false
        }
      ]
    }
  },
  {
    settings: {
      react: {
        version: "detect" // Automatically detect React version
      },
      jsdoc: {
        mode: "typescript" // Enables TypeScript mode for JSDoc
      }
    }
  }
];

export default eslintConfig;
