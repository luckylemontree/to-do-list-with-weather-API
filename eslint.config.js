import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        document: "readonly",
        window: "readonly",
        navigator: "readonly",
        alert: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
      },
    },
  },
];