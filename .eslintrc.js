module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
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
    'prefer-const': 0, // 禁止let 自动转const
    'comma-dangle': [2, 'always-multiline'], // 尾随逗号
    // 空格
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'vue/comment-directive': 'off',
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    semi: [2, 'always'],
    // 分号之前或之后放置不必要的空格
    'semi-spacing': [2, { before: false, after: true }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-empty': 0,
    'no-var': 'error', // 禁止使用 var
    'no-tabs': 0,
    'no-unused-vars': 1,
    'no-mixed-spaces-and-tabs': 'error', // 不能空格与tab混用
    'vue/html-closing-bracket-newline': 'off', // 不强制换行
    'vue/singleline-html-element-content-newline': 'off', // 不强制换行
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'any',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // 组件名必须是多个单词
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': ['off', 'never'],
    'vue/v-on-event-hyphenation': ['off',
      'never',
      {
        autofix: false,
        ignore: [],
      },
    ],
    // 'vue/first-attribute-linebreak': [
    //   'error',
    //   {
    //     singleline: 'beside',
    //     multiline: 'beside',
    //   },
    // ],
    'vue/html-indent': [0],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
  globals: {
    ref: 'readonly',
    reactive: 'readonly',
    watch: 'readonly',
    provide: 'readonly',
    inject: 'readonly',
    computed: 'readonly',
    onMounted: 'readonly',
    onBeforeUnmount: 'readonly',
    defineEmits: 'readonly',
    nextTick: 'readonly',
    defineProps: 'readonly',
  },
};
