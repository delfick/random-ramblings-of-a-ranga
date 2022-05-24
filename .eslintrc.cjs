module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".svelte", ".cjs"],
    project: "./tsconfig.json",
  },
  env: {
    es6: true,
    browser: true,
    amd: true,
    node: true,
  },
  settings: {
    "svelte3/typescript": true,
  },
  plugins: ["svelte3", "@typescript-eslint"],
  ignorePatterns: ["node_modules"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
};
