export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "standard-with-typescript",
  overrides: [
    {
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module", // Update sourceType to 'module'
  },
  rules: {
    "no-unused-vars": "error",
    "prefer-destructuring": "off",
    semi: ["error", "always"],
    "@typescript-eslint/semi": ["error", "always"],
    indent: ["error", 2],
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/consistent-type-definitions": "error",
    "no-console": "warn",
    "no-restricted-imports": ["error", "import1", "import2"],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
  },
};
