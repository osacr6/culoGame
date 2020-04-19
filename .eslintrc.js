module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'spaced-comment': "warn",
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'indent': ["warn", 2],
    "linebreak-style": "off",
    "no-var": "off",
    "space-before-function-paren": "off",
    "max-len": "off",
    "prefer-rest-params": "off",
    "comma-dangle": "warn",
    'quotes': ["off", "single", { 
      "allowTemplateLiterals": true
     }],
    'valid-jsdoc': ["warn", {
      "prefer": { 
        "arg": "param",
        "argument": "param", 
        "class": "constructor", 
        "return": "returns", 
        "virtual": 
        "abstract" 
      }
    }],
    "require-jsdoc": ["warn", {
      "require": { 
        "FunctionDeclaration": true,
        "MethodDefinition": true, 
        "ClassDeclaration": true, 
        "ArrowFunctionExpression": true, 
        "FunctionExpression": true 
      }
    }],
    "comma-dangle": ["error", "never"],
    'object-curly-spacing': "warn",
    'spaced-comment': "off",
    'no-unused-vars': 'warn',
    'camelcase': 'warn'
  } // rules
};
