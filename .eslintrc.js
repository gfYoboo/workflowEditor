module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "plugin:vue/essential",
    "plugin:vue/vue3-recommended",
    "standard",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "vue",
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": [2, { before: false, after: true }],
    "comma-style": [2, "last"],
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: [2, "always"],
    "semi-spacing": [2, { before: false, after: true }],
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, "never"],
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/html-self-closing": ["error", {
      html: {
        void: "never",
        normal: "never",
        component: "any",
      },
      svg: "always",
      math: "always",
    }],
    "vue/no-v-html": "off",
  },
};
