module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  "parser": "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-shadow": "off",
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/state-in-constructor": 0,
    "no-param-reassign": 0,
    "indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
    "no-tabs": 0,
    "react/prop-types": 0,
    "react/jsx-indent": [2, "tab"],
    "react/jsx-indent-props": [2, "tab"],
    "comma-dangle": ["error", "never"],
    "import/prefer-default-export": "off",
    "arrow-parens": 0,
    "eol-last": 0,
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
};
