module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "plugin:vue/essential",
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    // 尾随逗号
    'comma-dangle': [2, 'always-multiline'],
    // 空格
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'vue/comment-directive': 'off',
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    semi: [2, 'always'],
    // 分号之前或之后放置不必要的空格
    'semi-spacing': [2, { before: false, after: true }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'vue/max-attributes-per-line': [2, {
      singleline: {
        max: 5,
      },
      multiline: {
        max: 5,
      },
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'any',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/no-v-html': 'off',
    // 组件名必须是多个单词
    'vue/multi-word-component-names': 'off',
  },
  globals: {
    ref: 'readonly',
    reactive: 'readonly',
    watch: 'readonly',
    computed: 'readonly',
    onMounted: 'readonly',
    onBeforeUnmount: 'readonly',
  },
};
